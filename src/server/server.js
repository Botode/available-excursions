import createApp from './app';

async function start() {
  const app = createApp({ logger: true });

  await app.listen(process.env.PORT || 3000);
}

start();
