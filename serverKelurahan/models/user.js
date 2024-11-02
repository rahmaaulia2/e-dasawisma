'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'RoleId' });
      User.belongsTo(models.RT, { foreignKey: 'RtId' });
      User.belongsTo(models.RW, { foreignKey: 'RwId' });
    }
  }
  User.init({
    nama: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    noHp: DataTypes.STRING(15),
    alamat: DataTypes.STRING(100),
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    RtId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RT',
        key: 'id'
      }
    },
    RwId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RW',
        key: 'id'
      }
    },
    password: DataTypes.STRING(100)
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      }
    },
    modelName: 'User',
  });
  return User;
};