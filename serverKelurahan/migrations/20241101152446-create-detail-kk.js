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
      namaLengkap: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      jenisKelamin: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      tempatLahir: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      tanggalLahir: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      kartuKeluarga: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      noKKKTP: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      statusPerkawinan: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      agama: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      RtId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RTs',
          key: 'id'
        }
      },
      RwId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'RWs',
          key: 'id'
        }
      },
      alamat: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      pendidikan: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      pekerjaan: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      penghasilanSebulan: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      dokumenKependudukan: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      wusKeluarga: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      pusKeluarga: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      pusKB: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      ibuHamilKeluarga: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      ibuMenyusuiKeluarga: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      ibuBekerjaKeluarga: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      balitaKeluarga: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bbBayiNormal: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      asiBayiEkslusif: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bayiPosyandu: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bayiImunisasi: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      bbTbBayiNormal: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      riwayatPenyakitBayi: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      anakSekolah: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      anakTidakSekolah: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      anakYatimPiatu: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      lansia: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      keluargaDifabel: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      keluargaCacatMental: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      keluargaTidakMendapatkanPengobatan: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      bantuanPemerintah: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      keluargaMerokok: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      saranaAirBersih: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      jambanKeluarga: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      septicTank: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      pembuanganSampah: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      kriteriaRumah: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      statusRumah: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      aktivitasKeagamaan: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      aktivitasSosial: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      memilikiToga: {
        type: Sequelize.STRING(5),
        allowNull: false,
      },
      jenisUsaha: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      pengeluaranBulanan: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      keterangan: {
        type: Sequelize.STRING(150),
        allowNull: false,
        defaultValue: "-"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DetailKKs');
  }
};