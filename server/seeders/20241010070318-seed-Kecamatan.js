"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      { nama: "Baros" },
      { nama: "Cibereum" },
      { nama: "Cikole" },
      { nama: "Citamiang" },
      { nama: "Gunung Puyuh" },
      { nama: "Lembursitu" },
      { nama: "Warudoyong" },
    ].map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Kecamatans", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Kecamatans", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
