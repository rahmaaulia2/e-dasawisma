'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../dataSeed/rw.json").map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('RWs', data, );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('RWs', null, {truncate: true, restartIdentity: true});
  }
};
