require('dotenv').config();

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: 'mysql',
  port: 8889, // Utiliser "port" en minuscules
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
