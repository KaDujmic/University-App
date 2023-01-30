'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('course', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        default: Sequelize.UUIDV4
      },
      name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      credit_hours: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      major_id: {
        allowNull: false,
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
    await queryInterface.dropTable('course', { cascade: true });
  }
};
