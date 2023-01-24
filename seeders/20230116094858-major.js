'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('major', [
			{
				name: 'Computer Science',
				department_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
      {
				name: 'Chemistry',
				department_id: 2,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
