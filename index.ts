import fastify from 'fastify';

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'H-Custom': string;
}

const server = fastify();

server.get('/ping', async (request, reply) => 'pong\n');

server.get<{
  Querystring: IQuerystring;
  Headers: IHeaders;
}>(
  '/auth',
  {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query;
      done(
        username !== 'admin' ? new Error('Must be admin') : undefined,
      ); // only validate `admin` account
    },
  },
  async (request, reply) => {
    const customerHeader = request.headers['H-Custom'];
    // do something with request data
    return 'logged in!';
  },
);

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
