import { FastifyReply, FastifyRequest } from 'fastify';
import { google } from '@farm/trpc-api';
import { GoogleTokens, OAuth2RequestError } from 'arctic';
import { z } from 'zod';

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

    console.log(user);
  } catch (error) {
    console.error(error);
    return res.redirect(`${process.env.CLIENT_URL}/auth?error=oauth`);
  }
}
