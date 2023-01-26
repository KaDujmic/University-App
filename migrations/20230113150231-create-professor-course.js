'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('professor_course', {
      professor_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      course_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('professor_course');
  }
};
