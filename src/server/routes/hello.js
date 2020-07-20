export default async (app) => {
  app.get('/', async (req, res) => {
    // res.send('INDEX')
    return { hello: 'world' };
  });
};
