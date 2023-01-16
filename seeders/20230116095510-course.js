'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Courses', [
			{
				name: 'Chem 101',
				creditHours: 7,
				majorId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Chem 102',
				creditHours: 7,
				majorId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
