const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/connection');

class Clients extends Model {}

Clients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    site_name: {
      type: DataTypes.STRING,
    },
    client_name: {
      type: DataTypes.STRING,
    },
    labour_rate: {
      type: DataTypes.INTEGER,
    },
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'clients',
  }
);

module.exports = Clients;