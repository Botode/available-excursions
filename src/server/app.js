import path from 'path';
import fastify from 'fastify';
import autoload from 'fastify-autoload';
import db from './config/db_old';

// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch((err) => console.log('Error: ', err));

// const publicPath = path.resolve(__dirname, '..', '..', 'dist');

// Handlebars
// app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
// server.set('view engine', 'handlebars');

// app.use(express.static(publicPath));
// server.register('/excursions', excursions);

export default function (opts) {
  const app = fastify(opts);

  app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
  });

  return app;
}

// app.listen(PORT, (err, address) => {
//   if (err) {
//     server.log.error(err);
//     process.exit(1);
//   }
//   server.log.info(
//     `MERN Boilerplate listening on port ${PORT} and looking in folder ${publicPath}`,
//   );
// });
