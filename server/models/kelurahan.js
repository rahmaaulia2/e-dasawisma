"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kelurahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kelurahan.belongsTo(models.Kecamatan, { foreignKey: "KecamatanCode" });
      Kelurahan.hasMany(models.User, { foreignKey: "KelurahanCode" });
      Kelurahan.hasMany(models.DetailKK, { foreignKey: "KelurahanCode" });
    }
  }
  Kelurahan.init(
    {
      KemendagriKel: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kode Kelurahan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Kode Kelurahan tidak boleh kosong",
          },
          len: {
            args: [3, 20],
            msg: "Kode Kelurahan harus lebih dari 3 dan maksimal 20 karakter",
          },
        },
      },
      nama: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama kelurahan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nama kelurahan tidak boleh kosong",
          },
          len: {
            args: [3, 30],
            msg: "Nama kelurahan harus lebih dari 3 dan maksimal 30 karakter ",
          },
        },
      },
      KecamatanCode: {
        type: DataTypes.STRING(10),
        references: {
          model: "Kecamatan",
          key: "KemendagriKec",
        },
      },
    },
    {
      sequelize,
      modelName: "Kelurahan",
    }
  );
  return Kelurahan;
};
