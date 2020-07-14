import { Sequelize } from 'sequelize';

const db = new Sequelize('course_db_dev', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
});

export default db;
