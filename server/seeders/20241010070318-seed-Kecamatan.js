"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../kecamatan.json").map((el) => {
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
