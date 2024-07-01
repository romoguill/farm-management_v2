import { FastifyReply, FastifyRequest } from 'fastify';
import { google } from '@farm/trpc-api';
import { z } from 'zod';
import { db, users } from '@farm/db';
import { lucia } from '@farm/db';

const providersApi = {
  google: 'https://openidconnect.googleapis.com/v1/userinfo',
};

const profileSchemas = {
  google: z.object({
    sub: z.string(),
    name: z.string(),
    given_name: z.string(),
    family_name: z.string(),
    picture: z.string().url(),
    email: z.string().email(),
    email_verified: z.boolean(),
  }),
};

export async function googleHandler(
  req: FastifyRequest<{ Querystring: Record<string, string> }>,
  res: FastifyReply,
) {
  if (!req.query?.code || !req.query?.state) {
    // If google doesn't provide the code, oauth login failed. Send some param to handle on frontend
    return res.redirect(`${process.env.CLIENT_URL}/auth?error=oauth`);
  }

  const storedState = req.cookies.state;
  const storedCodeVerifier = req.cookies['code_verifier'];

  if (!storedState || !storedCodeVerifier) {
    // Cookies for validating. Have 10 min expiration time. Should not fail
    return res.redirect(`${process.env.CLIENT_URL}/auth?error=oauth`);
  }

  try {
    // Validate code from google provider with stored verifier
    const tokens = await google.validateAuthorizationCode(
      req.query.code,
      storedCodeVerifier,
    );

    // Get user profile based on consent screen setup in console
    const response = await fetch(providersApi.google, {
      headers: {
        Authorization: `Bearer ${tokens?.accessToken}`,
      },
    });
    const user = await response.json();

    const userProfile = profileSchemas.google.parse(user);

    // Check for user in db
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.googleId, userProfile.sub),
    });

    // If exists, create a session token on db and set cookie on client using that session's id
    if (existingUser) {
      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );

      return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
    }

    // If it doesn't exist create it (Sign in with provider = Sign up)
    const newUser = (
      await db
        .insert(users)
        .values({
          email: userProfile.email,
          googleId: userProfile.sub,
          username: userProfile.name,
          emailVerified: userProfile.email_verified,
        })
        .returning()
    )[0];

    // There are some github request for polishing this part. Check later
    if (!newUser) throw new Error('Error creating user in db');

    const session = await lucia.createSession(newUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    res.setCookie(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (error) {
    console.error(error);
    return res.redirect(`${process.env.CLIENT_URL}/auth?error=oauth`);
  }
}
