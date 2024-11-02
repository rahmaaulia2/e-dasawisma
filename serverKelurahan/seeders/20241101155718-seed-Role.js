'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = require("../dataSeed/role.json").map((el)=>{
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    })
    await queryInterface.bulkInsert('Roles', data, );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {truncate: true, restartIdentity: true});
  }
};
