'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('professor_course', [
      {
        professor_id: '20c1297e-58f6-4587-842b-231ff6583086',
        course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        professor_id: '20c1297e-58f6-4587-842b-231ff6583086',
        course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        professor_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        professor_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
        course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {}
};
