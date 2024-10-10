"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = [
      { nama: "Benteng", KecamatanId: 7 },
      { nama: "Dayeuhluhur", KecamatanId: 7 },
      { nama: "Nyomplong", KecamatanId: 7 },
      { nama: "Sukakarya", KecamatanId: 7 },
      { nama: "Warudoyong", KecamatanId: 7 },
    ].map((el) => {
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    await queryInterface.bulkInsert("Kelurahans", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Kelurahans", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
