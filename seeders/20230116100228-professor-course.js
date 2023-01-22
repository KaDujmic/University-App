'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('ProfessorCourses', [
			{
				professorId: '20c1297e-58f6-4587-842b-231ff6583086',
				courseId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				professorId: '20c1297e-58f6-4587-842b-231ff6583086',
				courseId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				professorId: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
				courseId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				professorId: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
				courseId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
