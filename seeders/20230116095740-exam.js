'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Exams', [
			{
				name: 'Chem 101 exam',
				date: new Date(),
				time: new Date(),
				courseId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Chem 102 exam',
				date: new Date(),
				time: new Date(),
				courseId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
