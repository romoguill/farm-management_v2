import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  FastifyTRPCPluginOptions,
  fastifyTRPCPlugin,
} from '@trpc/server/adapters/fastify';
import { appRouter, type AppRouter } from '@farm/trpc-api';
import { createContext } from './trpc/context.js';

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: 'http://localhost:3000' });

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

const start = async () => {
  try {
    await fastify.listen({ port: 4000 });
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

void start();
