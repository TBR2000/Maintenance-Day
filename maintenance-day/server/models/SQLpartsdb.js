const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/sqlconnection');

class Parts extends Model {}

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
    modelName: 'parts',
  }
);

module.exports = Parts;