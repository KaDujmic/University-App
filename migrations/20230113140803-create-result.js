'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Results', {
			studentId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			examId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			grade: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Results');
	},
};
