const mongoose = require('mongoose');
require('dotenv').config();
const Sequelize = require('sequelize');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/maintenanceday', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

/*
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;*/
module.exports = mongoose.connection;
