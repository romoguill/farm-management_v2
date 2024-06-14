import Fastify, { FastifyInstance } from "fastify";

const server: FastifyInstance = Fastify({});

server.get("/ping", async (req, res) => {
  return { pong: "OK" };
});

const start = async () => {
  try {
    await server.listen({ port: 3000 });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();
