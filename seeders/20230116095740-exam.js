'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('exam', [
      {
        id: 'f0d0ea4d-0e40-4987-866e-154da59552c5',
        name: 'Chem 101 exam',
        date: new Date(),
        time: new Date(),
        course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 'fff3cb51-f73a-4fbd-985f-e76054e1a9ea',
        name: 'Chem 102 exam',
        date: new Date(),
        time: new Date(),
        course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
