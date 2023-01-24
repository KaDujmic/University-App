'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('exam', [
			{
				name: 'Chem 101 exam',
				date: new Date(),
				time: new Date(),
				course_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				name: 'Chem 102 exam',
				date: new Date(),
				time: new Date(),
				course_id: 2,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
