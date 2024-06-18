import Fastify from 'fastify';
import cors from '@fastify/cors';

const fastify = Fastify({ logger: true });

await fastify.register(cors, { origin: 'http://localhost:3000' });

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
