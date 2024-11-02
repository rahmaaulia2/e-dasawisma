'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RW extends Model {
    static associate(models) {
      RW.hasMany(models.RT, { foreignKey: 'RWCode' });
      RW.hasMany(models.User, { foreignKey: 'RwId' });
    }
  }
  RW.init({
    nomor: DataTypes.STRING(3)
  }, {
    sequelize,
    modelName: 'RW',
  });
  return RW;
};