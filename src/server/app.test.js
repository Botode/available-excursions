import createApp from './app';

test('hello world', async () => {
  const app = createApp();

  const res = await app.inject('/');

  expect(res.json()).toEqual({ hello: 'world' });

  // t.deepEqual(res.json(), { hello: 'world' });

  await app.close();
});
