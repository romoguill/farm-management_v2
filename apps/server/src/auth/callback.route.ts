import { type FastifyInstance } from 'fastify';
import { googleHandler } from './callback.handler';

export async function authCallback(server: FastifyInstance) {
  server.get('/callbacks/google', googleHandler);
}
