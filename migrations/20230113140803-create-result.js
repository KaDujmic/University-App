'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('result', {
      student_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      exam_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      grade: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('result');
  }
};
