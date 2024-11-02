'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'RoleId' });
    }
  }
  Role.init({
    name: DataTypes.STRING(10)
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};