export default async (app) => {
  app.get('/', async (request, reply) => {
    reply.send({ hello: 'world' });
  });
};
