'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Majors', [
			{
				name: 'Computer Science',
				departmentId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
      {
				name: 'Chemistry',
				departmentId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
