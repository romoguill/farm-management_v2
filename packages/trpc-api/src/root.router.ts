import { authRouter } from './router/auth.router';
import { createTRPCRouter, publicProcedure } from './trpc';

export const appRouter = createTRPCRouter({
  // healthcheck: publicProcedure.query(() => {
  //   return { status: 'OK' };
  // }),
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
