'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'RoleId' });
      User.belongsTo(models.RT, { foreignKey: 'RtId' });
      User.belongsTo(models.RW, { foreignKey: 'RwId' });
      User.hasMany(models.DetailKK, { foreignKey: 'UserId' });
    }
  }
  User.init({
    nama: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Nama tidak boleh kosong'
        },
        len: {
          args: [3, 50],
          msg: 'Nama harus diantara 3 sampai 50 karakter'
        }
      }
    },
    email: {
      type: DataTypes.STRING(50),
      unique: {
        msg: 'Email sudah terdaftar'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Email tidak boleh kosong'
        },
        isEmail: {
          msg: 'Email tidak valid'
        },
        len: {
          args: [5, 50],
          msg: 'Email harus diantara 5 sampai 50 karakter'
        }
      }
    },
    noHp: {
      type: DataTypes.STRING(15),
      unique: {
        msg: 'No Hp sudah terdaftar'
      },
      allowNull: false,
      validate: {
        notNull: {
          msg: 'No Hp tidak boleh kosong'
        },
        notEmpty: {
          msg: 'No Hp tidak boleh kosong'
        },
        isNumeric: {
          msg: 'No Hp harus angka'
        },
        len: {
          args: [10, 15],
          msg: 'No Hp harus diantara 10 sampai 15 karakter'
        }
      }
    },
    alamat:{
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Alamat tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Alamat tidak boleh kosong'
        },
        len: {
          args: [5, 100],
          msg: 'Alamat harus diantara 5 sampai 100 karakter'
        }
      }
    },
    RoleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Role',
        key: 'id'
      },
      validate: {
        notNull: {
          msg: 'Role tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Role tidak boleh kosong'
        }
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
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password tidak boleh kosong'
        },
        notEmpty: {
          msg: 'Password tidak boleh kosong'
        }
      }
    }
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