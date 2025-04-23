import { Sequelize } from 'sequelize';
import 'dotenv/config'


const sequelize = new Sequelize(process.env.db_url, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    },
  },
  logging: false
});

export default sequelize;
