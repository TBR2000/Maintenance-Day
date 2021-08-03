const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Partsdb extends Model {}

Parts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    part_name: {
      type: DataTypes.STRING,
    },
    part_number: {
      type: DataTypes.INTEGER,
    },
    unit_price: {
      type: DataTypes.INTEGER,
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = Partsdb;