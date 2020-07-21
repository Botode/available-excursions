import path from 'path';
import fastify from 'fastify';
import autoload from 'fastify-autoload';
import models from './models/index';
import configs from './config/config';

// db.authenticate()
//   .then(() => console.log('Database connected...'))
//   .catch((err) => console.log('Error: ', err));

const env = process.env.NODE_ENV || 'development';
const config = configs[env];

export default (opts) => {
  const app = fastify(opts);

  app.register(autoload, {
    dir: path.join(__dirname, 'routes'),
    options: { models, config },
  });

  return app;
};
