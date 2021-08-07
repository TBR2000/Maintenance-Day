const mongoose = require('mongoose');
const { Sequelize } = require('sequelize');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/maintenanceday', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

let sequelize;

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}

module.exports = {
  mongoose: mongoose.connection,
  sequelize
}

