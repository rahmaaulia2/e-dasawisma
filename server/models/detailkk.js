"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DetailKK extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailKK.belongsTo(models.User, { foreignKey: "UserId" });
      DetailKK.belongsTo(models.Kelurahan, { foreignKey: "KelurahanCode" });
      DetailKK.belongsTo(models.Kecamatan, { foreignKey: "KecamatanCode" });
    }
  }
  DetailKK.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "id",
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
      namaLengkap: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nama lengkap tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nama lengkap tidak boleh kosong",
          },
          len: {
            args: [2, 30],
            msg: "Nama lengkap harus lebih dari 2 dan maksimal 30 karakter ",
          },
          isUppercase :{
            msg: "Nama lengkap harus huruf kapital"
          }
        },
      },
      jenisKelamin: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Jenis kelamin tidak boleh kosong",
          },
          notEmpty: {
            msg: "Jenis kelamin tidak boleh kosong",
          },
          len: {
            args: [2, 10],
            msg: "Jenis kelamin harus lebih dari 2 dan maksimal 10 karakter ",
          },
        },
      },
      tempatLahir: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tempat lahir tidak boleh kosong",
          },
          notEmpty: {
            msg: "Tempat lahir tidak boleh kosong",
          },
          len: {
            args: [2, 10],
            msg: "Tempat lahir harus lebih dari 2 dan maksimal 10 karakter ",
          }
        },
      },
      tanggalLahir: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Tanggal lahir tidak boleh kosong",
          },
          notEmpty: {
            msg: "Tanggal lahir tidak boleh kosong",
          },
          isDate:{
            msg: "Tanggal lahir harus berupa tanggal"
          }
        },
      },
      kartuKeluarga: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nomor KK tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nomor KK tidak boleh kosong",
          },
        },
      },
      noKKKTP: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Nomor KTP tidak boleh kosong",
          },
          notEmpty: {
            msg: "Nomor KTP tidak boleh kosong",
          },
        },
      },
      statusPerkawinan: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status perkawinan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Status perkawinan tidak boleh kosong",
          },
          len: {
            args: [2, 20],
            msg: "Status perkawinan harus lebih dari 2 dan maksimal 20 karakter ",
          }
        },
      },
      agama: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Agama tidak boleh kosong",
          },
          notEmpty: {
            msg: "Agama tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg: "Agama harus lebih dari 2 dan maksimal 10 karakter ",
          }
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
          len :{
            args: [1, 3],
            msg: "RT harus lebih dari 1 dan maksimal 3 karakter ",
          }
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
          len :{
            args: [1, 3],
            msg: "RW harus lebih dari 1 dan maksimal 3 karakter ",
          }
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
          len:{
            args: [2, 100],
            msg: "Alamat harus lebih dari 2 dan maksimal 100 karakter ",
          }
        },
      },
      pendidikan: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pendidikan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Pendidikan tidak boleh kosong",
          },
          len :{
            args: [2, 15],
            msg: "Pendidikan harus lebih dari 2 dan maksimal 15 karakter ",
          }
        },
      },
      pekerjaan: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pekerjaan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Pekerjaan tidak boleh kosong",
          },
          len :{
            args: [2, 30],
            msg: "Pekerjaan harus lebih dari 2 dan maksimal 30 karakter ",
          }
        },
      },
      penghasilanSebulan: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Penghasilan sebulan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Penghasilan sebulan tidak boleh kosong",
          },
          len :{
            args: [2, 40],
            msg: "Penghasilan sebulan harus lebih dari 2 dan maksimal 40 karakter ",
          }
        },
      },
      dokumenKependudukan: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Dokumen kependudukan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Dokumen kependudukan tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg: "Dokumen kependudukan harus lebih dari 2 dan maksimal 10 karakter ",
          }
        },
      },
      wusKeluarga: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: "WUS keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "WUS keluarga tidak boleh kosong",
          },
          len : {
            args: [1, 15],
            msg: "WUS keluarga harus lebih dari 1 dan maksimal 15 karakter ",
          }
        },
      },
      pusKeluarga: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "PUS keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "PUS keluarga tidak boleh kosong",
          },
          len : {
            args: [1, 5],
            msg: "PUS keluarga harus lebih dari 1 dan maksimal 5 karakter ",
          }
        },
      },
      pusKB: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "PUS KB tidak boleh kosong",
          },
          notEmpty: {
            msg: "PUS KB tidak boleh kosong",
          },
          len : {
            args: [2, 30],
            msg: "PUS KB harus lebih dari 2 dan maksimal 30 karakter ",
          }
        },
      },
      ibuHamilKeluarga: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ibu hamil keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Ibu hamil keluarga tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg: "Ibu hamil keluarga harus lebih dari 2 dan maksimal 10 karakter ",
          }
        },
      },
      ibuMenyusuiKeluarga: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ibu menyusui keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Ibu menyusui keluarga tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg: "Ibu menyusui keluarga harus lebih dari 2 dan maksimal 10 karakter ",
          }
        },
      },
      ibuBekerjaKeluarga: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Ibu bekerja keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Ibu bekerja keluarga tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg: "Ibu bekerja keluarga harus lebih dari 2 dan maksimal 10 karakter ",
          }
        },
      },
      balitaKeluarga: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Balita keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Balita keluarga tidak boleh kosong",
          },
          len :{
            args: [1, 20],
            msg: "Balita keluarga harus lebih dari 1 dan maksimal 20 karakter ",
          }
        },
      },
      bbBayiNormal: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "BB bayi normal tidak boleh kosong",
          },
          notEmpty: {
            msg: "BB bayi normal tidak boleh kosong",
          },
          len :{
            args: [2, 20],
            msg: "BB bayi normal harus lebih dari 2 dan maksimal 20 karakter ",
          }
        },
      },
      asiBayiEkslusif: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "ASI bayi eksklusif tidak boleh kosong",
          },
          notEmpty: {
            msg: "ASI bayi eksklusif tidak boleh kosong",
          },
          len :{
            args: [2, 20],
            msg: "ASI bayi eksklusif harus lebih dari 2 dan maksimal 20 karakter ",
          }
        },
      },
      bayiPosyandu: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Bayi posyandu tidak boleh kosong",
          },
          notEmpty: {
            msg: "Bayi posyandu tidak boleh kosong",
          },
          len :{
            args: [2, 20],
            msg : "Bayi posyandu harus lebih dari 2 dan maksimal 20 karakter",
          }
        },
      },
      bayiImunisasi: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Bayi imunisasi tidak boleh kosong",
          },
          notEmpty: {
            msg: "Bayi imunisasi tidak boleh kosong",
          },
          len :{
            args: [2, 20],
            msg : "Bayi imunisasi harus lebih dari 2 dan maksimal 20 karakter",
          }
        },
      },
      bbTbBayiNormal: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "BB/TB bayi normal tidak boleh kosong",
          },
          notEmpty: {
            msg: "BB/TB bayi normal tidak boleh kosong",
          },
          len :{
            args: [2, 20],
            msg : "BB/TB bayi normal harus lebih dari 2 dan maksimal 20 karakter",
          }
        },
      },
      riwayatPenyakitBayi: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Riwayat penyakit bayi tidak boleh kosong",
          },
          notEmpty: {
            msg: "Riwayat penyakit bayi tidak boleh kosong",
          },
          isUppercase :{
            msg: "Riwayat penyakit bayi harus huruf kapital"
          }
        },
      },
      anakSekolah: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Anak sekolah tidak boleh kosong",
          },
          notEmpty: {
            msg: "Anak sekolah tidak boleh kosong",
          },
          len :{
            args: [2, 30],
            msg : "Anak sekolah harus lebih dari 2 dan maksimal 30 karakter",
          }
        },
      },
      anakTidakSekolah: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Anak tidak sekolah tidak boleh kosong",
          },
          notEmpty: {
            msg: "Anak tidak sekolah tidak boleh kosong",
          },
          len :{
            args: [2, 50],
            msg : "Anak tidak sekolah harus lebih dari 2 dan maksimal 50 karakter",
          }
        },
      },
      anakYatimPiatu: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Anak yatim piatu tidak boleh kosong",
          },
          notEmpty: {
            msg: "Anak yatim piatu tidak boleh kosong",
          },
          len:{
            args: [2, 30],
            msg : "Anak yatim piatu harus lebih dari 2 dan maksimal 30 karakter",
          }
        },
      },
      lansia: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Lansia tidak boleh kosong",
          },
          notEmpty: {
            msg: "Lansia tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg : "Lansia harus lebih dari 2 dan maksimal 10 karakter",
          }
        },
      },
      keluargaDifabel: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keluarga difabel tidak boleh kosong",
          },
          notEmpty: {
            msg: "Keluarga difabel tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg : "Keluarga difabel harus lebih dari 2 dan maksimal 10 karakter",
          }
        },
      },
      keluargaCacatMental: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keluarga cacat mental tidak boleh kosong",
          },
          notEmpty: {
            msg: "Keluarga cacat mental tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg : "Keluarga cacat mental harus lebih dari 2 dan maksimal 10 karakter",
          }
        },
      },
      keluargaTidakMendapatkanPengobatan: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keluarga tidak mendapatkan pengobatan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Keluarga tidak mendapatkan pengobatan tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg : "Keluarga tidak mendapatkan pengobatan harus lebih dari 2 dan maksimal 10 karakter",
          }
        },
      },
      bantuanPemerintah: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Bantuan pemerintah tidak boleh kosong",
          },
          notEmpty: {
            msg: "Bantuan pemerintah tidak boleh kosong",
          },
          len :{
            args: [2, 50],
            msg : "Bantuan pemerintah harus lebih dari 2 dan maksimal 50 karakter",
          }
        },
      },
      keluargaMerokok: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keluarga merokok tidak boleh kosong",
          },
          notEmpty: {
            msg: "Keluarga merokok tidak boleh kosong",
          },
          len :{
            args: [2, 10],
            msg : "Keluarga merokok harus lebih dari 2 dan maksimal 10 karakter",
          }
        },
      },
      saranaAirBersih: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Sarana air bersih tidak boleh kosong",
          },
          notEmpty: {
            msg: "Sarana air bersih tidak boleh kosong",
          },
          len :{
            args: [2, 15],
            msg : "Sarana air bersih harus lebih dari 2 dan maksimal 15 karakter",
          },
          isUppercase :{
            msg: "Sarana air bersih harus huruf kapital"
          }
        },
      },
      jambanKeluarga: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Jamban keluarga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Jamban keluarga tidak boleh kosong",
          },
          len :{
            args: [2, 5],
            msg : "Jamban keluarga harus lebih dari 2 dan maksimal 5 karakter",
          }
        },
      },
      septicTank: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Septic tank tidak boleh kosong",
          },
          notEmpty: {
            msg: "Septic tank tidak boleh kosong",
          },
          len :{
            args: [2, 5],
            msg : "Septic tank harus lebih dari 2 dan maksimal 5 karakter",
          }
        },
      },
      pembuanganSampah: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pembuangan sampah tidak boleh kosong",
          },
          notEmpty: {
            msg: "Pembuangan sampah tidak boleh kosong",
          },
          len :{
            args: [2, 5],
            msg : "Pembuangan sampah harus lebih dari 2 dan maksimal 5 karakter ",
          }
        },
      },
      kriteriaRumah: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Kriteria rumah tidak boleh kosong",
          },
          notEmpty: {
            msg: "Kriteria rumah tidak boleh kosong",
          },
          len :{
            args: [2, 20],
            msg : "Kriteria rumah harus lebih dari 2 dan maksimal 20 karakter ",
          }
        },
      },
      statusRumah: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Status rumah tidak boleh kosong",
          },
          notEmpty: {
            msg: "Status rumah tidak boleh kosong",
          },
          len :{
            args: [2, 15],
            msg : "Status rumah harus lebih dari 2 dan maksimal 15 karakter ",
          }
        },
      },
      aktivitasKeagamaan: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Aktivitas keagamaan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Aktivitas keagamaan tidak boleh kosong",
          },
          len :{
            args: [2, 5],
            msg : "Aktivitas keagamaan harus lebih dari 2 dan maksimal 5 karakter ",
          }
        },
      },
      aktivitasSosial: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Aktivitas sosial tidak boleh kosong",
          },
          notEmpty: {
            msg: "Aktivitas sosial tidak boleh kosong",
          },
          len :{
            args: [2, 5],
            msg : "Aktivitas sosial harus lebih dari 2 dan maksimal 5 karakter ",
          }
        },
      },
      memilikiToga: {
        type: DataTypes.STRING(5),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Memiliki toga tidak boleh kosong",
          },
          notEmpty: {
            msg: "Memiliki toga tidak boleh kosong",
          },
          len :{
            args : [2, 5],
            msg : "Memiliki toga harus lebih dari 2 dan maksimal 5 karakter ",
          }
        },
      },
      jenisUsaha: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Jenis usaha tidak boleh kosong",
          },
          notEmpty: {
            msg: "Jenis usaha tidak boleh kosong",
          },
          len :{
            args: [2, 30],
            msg : "Jenis usaha harus lebih dari 2 dan maksimal 30 karakter ",
          }
        },
      },
      pengeluaranBulanan: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Pengeluaran bulanan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Pengeluaran bulanan tidak boleh kosong",
          },
          len :{
            args: [2, 30],
            msg : "Pengeluaran bulanan harus lebih dari 2 dan maksimal 30 karakter ",
          },
          isUppercase :{
            msg: "Pengeluaran bulanan harus huruf kapital"
          }
        },
      },
      keterangan: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: "Keterangan tidak boleh kosong",
          },
          notEmpty: {
            msg: "Keterangan tidak boleh kosong",
          },
          len :{
            args: [1, 150],
            msg : "Keterangan harus lebih dari 1 dan maksimal 150 karakter ",
          },
          isUppercase :{
            msg: "Keterangan harus huruf kapital"
          }
        },
      },
    },
    {
      sequelize,
      modelName: "DetailKK",
    }
  );
  return DetailKK;
};
