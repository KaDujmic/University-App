'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('course', [
			{
				name: 'Chem 101',
				credit_hours: 7,
				major_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Chem 102',
				credit_hours: 7,
				major_id: 2,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
