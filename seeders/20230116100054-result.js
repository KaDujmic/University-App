'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Results', [
			{
				studentId: 'f034675d-8d14-463f-a360-2e28345a212d',
				examId: 1,
				grade: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				studentId: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				examId: 2,
				grade: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				studentId: 'f034675d-8d14-463f-a360-2e28345a212d',
				examId: 2,
				grade: 4,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				studentId: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				examId: 1,
				grade: 3,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
