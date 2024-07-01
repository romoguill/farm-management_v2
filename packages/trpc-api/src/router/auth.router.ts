import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '../lib/oauth';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import cookie from '@fastify/cookie';
import { z } from 'zod';
import { db, emailVerifications, lucia, users } from '@farm/db';
import { TRPCError } from '@trpc/server';
import { generateEmailVerificationCode } from '../utils/verification-code';
import { eq } from 'drizzle-orm';
import { isWithinExpirationDate } from 'oslo';
import { loginSchema, registerSchema } from '../validation-schemas/auth.schema';
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from '../lib/send-email';

// Recomended options from docs
const ARGON_HASHING_OPTIONS = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export const authRouter = createTRPCRouter({
  me: protectedProcedure.query(async ({ ctx: { user } }) => {
    return { user };
  }),
  signInGoogle: publicProcedure.mutation(async (ops) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ['email', 'profile'],
    });

    const cookieState = cookie.serialize('state', state, {
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10,
    });
    ops.ctx.res.header('set-cookie', cookieState);

    const cookieCode = cookie.serialize('code_verifier', codeVerifier, {
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10,
    });
    ops.ctx.res.header('set-cookie', cookieCode);

    return { url: url.toString() };
  }),
  signInCredentials: publicProcedure
    .input(loginSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, input.email),
      });

      if (!existingUser)
        throw new TRPCError({
          message: 'Invalid credentials',
          code: 'BAD_REQUEST',
        });

      // If user exists but has no password, means that he was logged with provider
      if (!existingUser.passwordHash)
        throw new TRPCError({
          message: 'Try using provider',
          code: 'BAD_REQUEST',
        });

      const validPassword = await bcrypt.compare(
        existingUser.passwordHash,
        input.password,
      );

      if (!validPassword)
        throw new TRPCError({
          message: 'Invalid credentials',
          code: 'BAD_REQUEST',
        });

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      ctx.res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }),
  registerCredentials: publicProcedure
    .input(registerSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, input.email),
      });

      if (existingUser)
        throw new TRPCError({
          message: 'Email already registered',
          code: 'CONFLICT',
        });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(input.password, salt);

      // Create user in DB
      const [newUser] = await db
        .insert(users)
        .values({ email: input.email, passwordHash })
        .returning({ id: users.id, email: users.email });

      if (!newUser || !newUser.email)
        throw new TRPCError({
          message: "Couldn't create user in database",
          code: 'INTERNAL_SERVER_ERROR',
        });

      // Set up email verification code
      const verificationCode = await generateEmailVerificationCode(
        newUser.id,
        newUser.email,
      );

      const { error: emailError } = await sendVerificationEmail({
        to: [newUser.email],
        code: verificationCode,
      });

      console.log(emailError);
      if (emailError)
        throw new TRPCError({
          message: "Couldn't send verification email",
          code: 'INTERNAL_SERVER_ERROR',
        });

      const session = await lucia.createSession(newUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      ctx.res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      console.log(ctx.res.cookies);

      return { user: newUser };
    }),
  // Optional for recreating code if user doesn't recieve email with code
  resendCode: protectedProcedure.mutation(async ({ ctx }) => {
    // Delete old code
    await db
      .delete(emailVerifications)
      .where(eq(emailVerifications.email, ctx.user.email));

    const verificationCode = await generateEmailVerificationCode(
      ctx.user.id,
      ctx.user.email,
    );

    const emailError = await sendVerificationEmail({
      to: [ctx.user.email],
      code: verificationCode,
    });
    console.log(emailError);
    if (emailError)
      return new TRPCError({
        message: "Couldn't send verification email",
        code: 'INTERNAL_SERVER_ERROR',
      });
  }),
  // For user to use code sent to email
  emailVerification: protectedProcedure
    .input(
      z.object({
        code: z.string().length(8),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const verifications = await db.query.emailVerifications.findFirst({
        where: eq(emailVerifications.userId, ctx.user.id),
        columns: { code: true, expiresAt: true, id: true },
      });

      if (!verifications || !verifications.code) {
        throw new TRPCError({
          message: "Couldn't retrieve verification code",
          code: 'BAD_REQUEST',
        });
      }

      // Delete for security and maintenance purpose
      await db
        .delete(emailVerifications)
        .where(eq(emailVerifications.id, verifications.id));

      if (!isWithinExpirationDate(verifications.expiresAt)) {
        throw new TRPCError({
          message: 'Must generate new code',
          code: 'BAD_REQUEST',
        });
      }

      const validCode = verifications.code === input.code;

      if (!validCode) {
        throw new TRPCError({ message: 'Code not valid', code: 'FORBIDDEN' });
      }

      // If valid delete old session, update user and recreate session
      await lucia.invalidateUserSessions(ctx.user.id);
      await db
        .update(users)
        .set({ emailVerified: true })
        .where(eq(users.id, ctx.user.id));

      const session = await lucia.createSession(ctx.user.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      ctx.res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }),
  signOut: publicProcedure.mutation(({ ctx }) => {
    const sessionCookie = lucia.createBlankSessionCookie();
    ctx.res.setCookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );
  }),
});
