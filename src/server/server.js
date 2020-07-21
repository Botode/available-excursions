import createApp from './app';

async function start() {
  const app = createApp({ logger: true });

  await app.listen(process.env.PORT || 3000, (err, address) => {
    console.log(err, address);
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    app.log.info(`server listening on ${address}`);
  });
}

start();
