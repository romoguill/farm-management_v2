import { generateCodeVerifier, generateState } from 'arctic';
import { google } from '../lib/oauth';
import { createTRPCRouter, publicProcedure, protectedProcedure } from '../trpc';
import cookie from '@fastify/cookie';

export const authRouter = createTRPCRouter({
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
  me: protectedProcedure.query(async ({ ctx: { user } }) => {
    return { user };
  }),
});
