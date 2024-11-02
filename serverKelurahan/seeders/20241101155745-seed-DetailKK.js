'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../dataSeed/kk.json").map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('DetailKKs', data, );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('DetailKKs', null, {truncate: true, restartIdentity: true});
  }
};
