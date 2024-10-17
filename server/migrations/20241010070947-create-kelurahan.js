"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kelurahans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      KemendagriKel: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false,
      },
      nama: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      KecamatanCode: {
        type: Sequelize.STRING(10),
        references: {
          model: "Kecamatans",
          key: "KemendagriKec",
        },
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
    await queryInterface.dropTable("Kelurahans");
  },
};
