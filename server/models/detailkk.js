'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailKK extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailKK.belongsTo(models.User, {foreignKey: 'UserId'})
      DetailKK.belongsTo(models.Kelurahan, {foreignKey: 'KelurahanId'})
      DetailKK.belongsTo(models.Kecamatan, {foreignKey: 'KecamatanId'})
    }
  }
  DetailKK.init({
    UserId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'User',
        key: 'id'
      }
    },
    KecamatanId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Kecamatan',
        key: 'id'
      }
    },
    KelurahanId: {
      type: DataTypes.INTEGER,
      references:{
        model: 'Kelurahan',
        key: 'id'
      }
    },
    namaLengkap: DataTypes.STRING,
    jenisKelamin: DataTypes.STRING,
    tempatLahir: DataTypes.STRING,
    tanggalLahir: DataTypes.DATE,
    kartuKeluarga: DataTypes.STRING,
    noKKKTP: DataTypes.STRING,
    statusPerkawinan: DataTypes.STRING,
    agama: DataTypes.STRING,
    rt: DataTypes.STRING,
    rw: DataTypes.STRING,
    alamat: DataTypes.STRING,
    pendidikan: DataTypes.STRING,
    pekerjaan: DataTypes.STRING,
    penghasilanSebulan: DataTypes.STRING,
    dokumenKependudukan: DataTypes.STRING,
    wusKeluarga: DataTypes.STRING,
    pusKeluarga: DataTypes.STRING,
    pusKB: DataTypes.STRING,
    ibuHamilKeluarga: DataTypes.STRING,
    ibuMenyusuiKeluarga: DataTypes.STRING,
    ibuBekerjaKeluarga: DataTypes.STRING,
    balitaKeluarga: DataTypes.STRING,
    bbBayiNormal: DataTypes.STRING,
    asiBayiEkslusif: DataTypes.STRING,
    bayiPosyandu: DataTypes.STRING,
    bayiImunisasi: DataTypes.STRING,
    bbTbBayiNormal: DataTypes.STRING,
    riwayatPenyakitBayi: DataTypes.STRING,
    anakSekolah: DataTypes.STRING,
    anakTidakSekolah: DataTypes.STRING,
    anakYatimPiatu: DataTypes.STRING,
    lansia: DataTypes.STRING,
    keluargaDifabel: DataTypes.STRING,
    keluargaCacatMental: DataTypes.STRING,
    keluargaTidakMendapatkanPengobatan: DataTypes.STRING,
    bantuanPemerintah: DataTypes.STRING,
    keluargaMerokok: DataTypes.STRING,
    saranaAirBersih: DataTypes.STRING,
    jambanKeluarga: DataTypes.STRING,
    septicTank: DataTypes.STRING,
    pembuanganSampah: DataTypes.STRING,
    kriteriaRumah: DataTypes.STRING,
    statusRumah: DataTypes.STRING,
    aktivitasKeagamaan: DataTypes.STRING,
    aktivitasSosial: DataTypes.STRING,
    memilikiToga: DataTypes.STRING,
    jenisUsaha: DataTypes.STRING,
    pengeluaranBulanan: DataTypes.STRING,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'DetailKK',
  });
  return DetailKK;
};