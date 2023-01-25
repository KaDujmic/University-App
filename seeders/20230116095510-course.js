'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('course', [
			{
				id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd',
				name: 'Chem 101',
				credit_hours: 7,
				major_id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
				name: 'Chem 102',
				credit_hours: 7,
				major_id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
