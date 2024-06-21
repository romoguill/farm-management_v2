import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '../lib/oauth';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import cookie from '@fastify/cookie';
import { z } from 'zod';
import { db, lucia, users } from '@farm/db';
import { TRPCError } from '@trpc/server';
import argon from '@node-rs/argon2';

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
  registerCredentials: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6).max(20),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await db.query.users.findFirst({
        where: (user, { eq }) => eq(user.email, input.email),
      });

      if (existingUser)
        throw new TRPCError({
          message: 'Email already registered',
          code: 'CONFLICT',
        });

      const passwordHash = await argon.hash(
        input.password,
        ARGON_HASHING_OPTIONS,
      );

      const [newUser] = await db
        .insert(users)
        .values({ email: input.email, passwordHash })
        .returning({ id: users.id, email: users.email });

      if (!newUser)
        throw new TRPCError({
          message: "Couldn't create user in database",
          code: 'INTERNAL_SERVER_ERROR',
        });

      const session = await lucia.createSession(newUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      ctx.res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return { user: newUser };
    }),
});
