import { initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import superjson from "superjson";
import { ZodError } from "zod";

export const createTRPCContext = async (opts: {
  headers: Headers,

}) => {
  // TODO: Not implementing auth yet but will need authtoken in context
  const authToken = opts.headers.get('Authorization') ?? null;

  return { authToken };
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

// For making a call to the server inside the same server and avoid intance duplication
export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
