'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RT extends Model {
    static associate(models) {
      RT.belongsTo(models.RW, { foreignKey: 'RWCode' });
      RT.hasMany(models.User, { foreignKey: 'RtId' });
    }
  }
  RT.init({
    RWCode: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RW',
        key: 'id'
      }
    },
    nomor: DataTypes.STRING(3)
  }, {
    sequelize,
    modelName: 'RT',
  });
  return RT;
};