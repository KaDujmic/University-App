'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('ProfessorCourses', [
			// {
			// 	professorId: 1,
			// 	courseId: 1,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
			// {
			// 	professorId: 1,
			// 	courseId: 2,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
			// {
			// 	professorId: 2,
			// 	courseId: 1,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
			// {
			// 	professorId: 2,
			// 	courseId: 2,
			// 	createdAt: new Date(),
			// 	updatedAt: new Date(),
			// },
		]);
	},

	async down(queryInterface, Sequelize) {},
};
