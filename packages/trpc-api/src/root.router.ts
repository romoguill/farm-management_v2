import { authRouter } from './router/auth.router';
import { marketRouter } from './router/market.router';
import { createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  // healthcheck: publicProcedure.query(() => {
  //   return { status: 'OK' };
  // }),
  auth: authRouter,
  market: marketRouter,
});

export type AppRouter = typeof appRouter;
