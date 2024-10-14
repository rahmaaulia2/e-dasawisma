"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../kelurahan.json").map((el) => {
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
