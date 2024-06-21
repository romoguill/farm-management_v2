import { TRPCError, initTRPC } from '@trpc/server';
import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import superjson from 'superjson';
import { ZodError } from 'zod';
import { lucia, type DatabaseUserAttributes } from '@farm/db';

export const createTRPCContext = async (
  opts: CreateFastifyContextOptions,
): Promise<CreateFastifyContextOptions & { user?: DatabaseUserAttributes }> => {
  return { ...opts, user: undefined };
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

  const { user, session } = await lucia.validateSession(sessionId);

  try {
    // If session.fresh === true, means that the session in db was renwed and must update the cookie to match it
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      ctx.res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    // If validate session failed, delete old cookie
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      ctx.res.setCookie(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }
  } catch (error) {}

  return next({
    ctx: {
      ...ctx,
      user: user as unknown as DatabaseUserAttributes,
    },
  });
});
