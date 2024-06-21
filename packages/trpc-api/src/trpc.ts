import { TRPCError, initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { lucia, type DatabaseUserAttributes } from '@farm/db';

export const createTRPCContext = async (
  opts: CreateFastifyContextOptions,
): Promise<
  CreateFastifyContextOptions & { user: DatabaseUserAttributes | null }
> => {
  const user: DatabaseUserAttributes | null = null;
  return { ...opts, user };
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

export const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const sessionId = lucia.readSessionCookie(ctx.req.headers.cookie ?? '');
  if (!sessionId) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  const { user } = await lucia.validateSession(sessionId);

  return next({
    ctx: {
      ...ctx,
      user: user as unknown as DatabaseUserAttributes,
    },
  });
});
