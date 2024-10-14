'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kecamatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kecamatan.hasMany(models.Kelurahan, {foreignKey : "KecamatanId"})
      Kecamatan.hasMany(models.User, {foreignKey : "KecamatanId"})
    }
  }
  Kecamatan.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kecamatan',
  });
  return Kecamatan;
};