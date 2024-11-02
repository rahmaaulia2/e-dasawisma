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
        type: Sequelize.STRING(50)
      },
      email: {
        type: Sequelize.STRING(50)
      },
      noHp: {
        type: Sequelize.STRING(15)
      },
      alamat: {
        type: Sequelize.STRING(100)
      },
      RoleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id'
        }
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
      password: {
        type: Sequelize.STRING(70)
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