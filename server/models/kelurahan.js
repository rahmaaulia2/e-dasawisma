'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kelurahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Kelurahan.belongsTo(models.Kecamatan, {foreignKey : "KecamatanId"})
    }
  }
  Kelurahan.init({
    nama: DataTypes.STRING,
    KecamatanId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Kecamatan',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Kelurahan',
  });
  return Kelurahan;
};