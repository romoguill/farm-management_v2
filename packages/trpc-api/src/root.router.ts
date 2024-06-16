import { createTRPCRouter, publicProcedure } from './trpc';

export const appRouter = createTRPCRouter({
  healthcheck: publicProcedure.query(() => {
    return { status: 'OK' };
  }),
});

export type AppRouter = typeof appRouter;
