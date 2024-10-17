'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      noHp: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      alamat: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      KecamatanCode: {
        type: Sequelize.STRING(20),
        references :{
          model : 'Kecamatans',
          key : 'KemendagriKec'
        }
      },
      KelurahanCode: {
        type: Sequelize.STRING(20),
        references :{
          model : 'Kelurahans',
          key : 'KemendagriKel'
        }
      },
      rt: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      rw: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(70),
        allowNull: false,
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
    await queryInterface.dropTable('Users');
  }
};