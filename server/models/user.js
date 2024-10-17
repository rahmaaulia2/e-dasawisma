"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Kecamatan, { foreignKey: "KecamatanCode" });
      User.belongsTo(models.Kelurahan, { foreignKey: "KelurahanCode" });
      User.hasOne(models.DetailKK, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      nama: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Nama tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nama tidak boleh kosong",
          },
          len: {
            args: [3, 30],
            msg: "Nama harus lebih dari 3 dan maksimal 30 karakter ",
          },
        },
      },
      email: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email tidak boleh kosong",
          },
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            msg: "Format email salah",
          },
          len: {
            args: [3, 20],
            msg: "Email harus lebih dari 3 dan maksimal 20 karakter ",
          },
        },
      },
      noHp: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nomor HP tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nomor HP tidak boleh kosong",
          },
          len: {
            args: [10, 15],
            msg: "Nomor HP harus lebih dari 10 dan maksimal 15 karakter ",
          },
        },
      },
      alamat: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Alamat tidak boleh kosong",
          },
          notEmpty: {
            msg: "Alamat tidak boleh kosong",
          },
          len: {
            args: [3, 100],
            msg: "Alamat harus lebih dari 3 dan maksimal 100 karakter ",
          },
        },
      },
      KecamatanCode: {
        type: DataTypes.STRING(20),
        references: {
          model: "Kecamatan",
          key: "KemendagriKec",
        },
      },
      KelurahanCode: {
        type: DataTypes.STRING(20),
        references: {
          model: "Kelurahan",
          key: "KemendagriKel",
        },
      },
      rt: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          notNull: {
            msg: "RT tidak boleh kosong",
          },
          notEmpty: {
            msg: "RT tidak boleh kosong",
          },
          len: {
            args: [1, 3],
            msg: "RT harus lebih dari 1 dan maksimal 3 karakter ",
          },
        },
      },
      rw: {
        type: DataTypes.STRING(3),
        allowNull: false,
        validate: {
          notNull: {
            msg: "RW tidak boleh kosong",
          },
          notEmpty: {
            msg: "RW tidak boleh kosong",
          },
          len: {
            args: [1, 3],
            msg: "RW harus lebih dari 1 dan maksimal 3 karakter ",
          },
        },
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Role tidak boleh kosong",
          },
          notEmpty: {
            msg: "Role tidak boleh kosong",
          },
          len: {
            args: [2, 10],
            msg: "Role harus lebih dari 2 dan maksimal 10 karakter ",
          },
        },
      },
      password: {
        type: DataTypes.STRING(70),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password tidak boleh kosong",
          },
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          len: {
            args: [6, 70],
            msg: "Password harus lebih dari 6 dan maksimal 20 karakter ",
          },
        },
      },
    },
    {
      sequelize,
      hooks: {
        beforeCreate(user) {
          user.password = hashPassword(user.password);
        }
      },
      modelName: "User",
    }
  );
  return User;
};
