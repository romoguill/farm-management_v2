import { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';

export function createContext(opts: CreateFastifyContextOptions) {
  return { ...opts };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
