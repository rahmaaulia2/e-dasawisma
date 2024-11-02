'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../dataSeed/rt.json").map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('RTs', data, );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RTs', null, {truncate: true, restartIdentity: true});
  }
};
