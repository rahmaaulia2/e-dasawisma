'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetailKKs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      KelurahanId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Kelurahans',
          key: 'id'
        }
      },
      namaLengkap: {
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.STRING
      },
      tempatLahir: {
        type: Sequelize.STRING
      },
      tanggalLahir: {
        type: Sequelize.DATE
      },
      kartuKeluarga: {
        type: Sequelize.STRING
      },
      noKKKTP: {
        type: Sequelize.STRING
      },
      statusPerkawinan: {
        type: Sequelize.STRING
      },
      agama: {
        type: Sequelize.STRING
      },
      rt: {
        type: Sequelize.STRING
      },
      rw: {
        type: Sequelize.STRING
      },
      alamat: {
        type: Sequelize.STRING
      },
      pendidikan: {
        type: Sequelize.STRING
      },
      pekerjaan: {
        type: Sequelize.STRING
      },
      penghasilanSebulan: {
        type: Sequelize.STRING
      },
      dokumenKependudukan: {
        type: Sequelize.STRING
      },
      wusKeluarga: {
        type: Sequelize.STRING
      },
      pusKeluarga: {
        type: Sequelize.STRING
      },
      pusKB: {
        type: Sequelize.STRING
      },
      ibuHamilKeluarga: {
        type: Sequelize.STRING
      },
      ibuMenyusuiKeluarga: {
        type: Sequelize.STRING
      },
      ibuBekerjaKeluarga: {
        type: Sequelize.STRING
      },
      balitaKeluarga: {
        type: Sequelize.STRING
      },
      bbBayiNormal: {
        type: Sequelize.STRING
      },
      asiBayiEkslusif: {
        type: Sequelize.STRING
      },
      bayiPosyandu: {
        type: Sequelize.STRING
      },
      bayiImunisasi: {
        type: Sequelize.STRING
      },
      bbTbBayiNormal: {
        type: Sequelize.STRING
      },
      riwayatPenyakitBayi: {
        type: Sequelize.STRING
      },
      anakSekolah: {
        type: Sequelize.STRING
      },
      anakTidakSekolah: {
        type: Sequelize.STRING
      },
      anakYatimPiatu: {
        type: Sequelize.STRING
      },
      lansia: {
        type: Sequelize.STRING
      },
      keluargaDifabel: {
        type: Sequelize.STRING
      },
      keluargaCacatMental: {
        type: Sequelize.STRING
      },
      keluargaTidakMendapatkanPengobatan: {
        type: Sequelize.STRING
      },
      bantuanPemerintah: {
        type: Sequelize.STRING
      },
      keluargaMerokok: {
        type: Sequelize.STRING
      },
      saranaAirBersih: {
        type: Sequelize.STRING
      },
      jambanKeluarga: {
        type: Sequelize.STRING
      },
      septicTank: {
        type: Sequelize.STRING
      },
      pembuanganSampah: {
        type: Sequelize.STRING
      },
      kriteriaRumah: {
        type: Sequelize.STRING
      },
      statusRumah: {
        type: Sequelize.STRING
      },
      aktivitasKeagamaan: {
        type: Sequelize.STRING
      },
      aktivitasSosial: {
        type: Sequelize.STRING
      },
      memilikiToga: {
        type: Sequelize.STRING
      },
      jenisUsaha: {
        type: Sequelize.STRING
      },
      pengeluaranBulanan: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailKKs');
  }
};