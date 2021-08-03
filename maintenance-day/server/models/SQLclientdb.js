const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class clientdb extends Model {}

Clients.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    site: {
      type: DataTypes.STRING,
    },
    client: {
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
    modelName: 'user',
  }
);

module.exports = clientdb;