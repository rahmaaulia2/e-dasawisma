'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helper/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Kecamatan, {foreignKey : "KecamatanId"})
      User.belongsTo(models.Kelurahan, {foreignKey : "KelurahanId"})
      User.hasOne(models.DetailKK, {foreignKey : "UserId"})
    }
  }
  User.init({
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    noHp: DataTypes.STRING,
    alamat: DataTypes.STRING,
    KecamatanId: {
      type: DataTypes.INTEGER,
      references : {
        model : 'Kecamatan',
        key : 'id'
      }
    },
    KelurahanId: {
      type : DataTypes.INTEGER,
      references : {
        model : 'Kelurahan',
        key : 'id'
      }
    },
    rt : DataTypes.STRING,
    rw : DataTypes.STRING,
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    },
    modelName: 'User',
  });
  return User;
};