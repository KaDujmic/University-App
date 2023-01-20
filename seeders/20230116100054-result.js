'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Results', [
			// {
			// 	studentId: 1,
			// 	examId: 1,
			// 	grade: 1,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
			// {
			// 	studentId: 2,
			// 	examId: 2,
			// 	grade: 2,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
			// {
			// 	studentId: 1,
			// 	examId: 2,
			// 	grade: 4,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
			// {
			// 	studentId: 2,
			// 	examId: 1,
			// 	grade: 3,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
		]);
	},

	async down(queryInterface, Sequelize) {},
};
