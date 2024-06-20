import Fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from '@trpc/server/adapters/fastify';
import { appRouter, type AppRouter } from '@farm/trpc-api';
import { createContext } from './libs/trpc/context';
import { authCallback } from './auth/callback.route';

const fastify = Fastify({ logger: true });

await fastify.register(cors, {
  origin: 'http://localhost:3000',
  credentials: true,
});
await fastify.register(cookie);

await fastify.register(fastifyTRPCPlugin, {
  prefix: '/api/trpc',
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error on path ${path}: ${error}`);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
});

fastify.get('/', (req, res) => {
  return { server: 'OK' };
});

fastify.register(authCallback, { prefix: 'auth' });

const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

void start();
