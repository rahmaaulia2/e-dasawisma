'use strict';
const {
  Model
} = require('sequelize');
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
    role: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};