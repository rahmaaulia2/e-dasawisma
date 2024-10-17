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
      Kecamatan.hasMany(models.Kelurahan, {foreignKey : "KecamatanCode"})
      Kecamatan.hasMany(models.User, {foreignKey : "KecamatanCode"})
      Kecamatan.hasMany(models.DetailKK, {foreignKey : "KecamatanCode"})
    }
  }
  Kecamatan.init({
    KemendagriKec:{
      type : DataTypes.STRING(20),
      allowNull : false,
      validate : {
        notNull : {
          msg : "Kode Kecamatan tidak boleh kosong"
        },
        notEmpty : {
          msg : "Kode Kecamatan tidak boleh kosong"
        },
        len: {
          args: [3,20],
          msg: "Kode Kecamatan harus lebih dari 3 dan maksimal 20 karakter"
        }
      }
    },
    nama: {
      type : DataTypes.STRING(20),
      allowNull : false,
      validate : {
        notNull : {
          msg : "Nama kecamatan tidak boleh kosong"
        },
        notEmpty : {
          msg : "Nama kecamatan tidak boleh kosong"
        },
        len :{
          args : [3, 20],
          msg : "Nama kecamatan harus lebih dari 3 dan maksimal 20 karakter "
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Kecamatan',
  });
  return Kecamatan;
};