import { Sequelize } from 'sequelize';
import { db } from '../../config';

// const dbURI = `${db.type}://${db.username}:${db.password}@${db.host}:${db.port}/${db.name}`;
const sequelize = new Sequelize(
  db.name,
  db.username,
  db.password,
  {
    dialect: 'postgres',
    port: 5432,
    host: 'localhost'
  }
);

export { sequelize };