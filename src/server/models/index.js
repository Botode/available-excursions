import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import { Sequelize } from 'sequelize';
import configs from '../config/config';

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable],
    config,
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    (() => {
      const modelPath = join(__dirname, file);
      console.log(modelPath);
      import(modelPath)
        .then((modelModule) => {
          const model = modelModule.default(
            sequelize,
            Sequelize.DataTypes,
          );
          db[model.name] = model;
        })
        .catch((err) => console.log(err));
    })();
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
