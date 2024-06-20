import { initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import superjson from 'superjson';
import { ZodError } from 'zod';

export const createTRPCContext = async (opts: CreateFastifyContextOptions) => {
  return { ...opts };
};

const transformer = {
  input: superjson,
  output: superjson,
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
    },
  }),
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
