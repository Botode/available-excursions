const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

export default async (app, opts, next) => {
  console.log(opts);
  const { User } = opts.models;
  User.sync();
  const schema = {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 },
      },
      required: ['email', 'password'],
    },
  };
  app.post('/register', { schema }, async (request, reply) => {
    try {
      const { email, password } = request.body;

      console.log(email);
      const preUser = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (preUser) {
        const err = new Error('user exist');
        err.statusCode = 400;
        throw err;
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      await User.create({
        email: email.toLowerCase(),
        password: hash,
      });
      reply.send({ msg: 'user registered' });
    } catch (err) {
      reply.send(err);
    }
    await reply;
  });

  app.post('/login', { schema }, async (request, reply) => {
    try {
      const { email, password } = request.body;

      console.log(email);
      const user = await User.findOne({
        where: { email: email.toLowerCase() },
      });

      if (!user) {
        const err = new Error('user with password not found');
        err.statusCode = 400;
        throw err;
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const err = new Error('user with password not found');
        err.statusCode = 400;
        throw err;
      }

      const token = jwt.sign(
        { userId: user.id },
        opts.config.jwtsecret,
        { expiresIn: '24h' },
      );

      reply.send({ token, userId: user.id });
    } catch (err) {
      reply.send(err);
    }
    await reply;
  });

  next();
};

// export const autoPrefix = '/excursions';
