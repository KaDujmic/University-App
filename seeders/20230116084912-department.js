'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Departments', [
			{
				name: 'IT',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Science',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
