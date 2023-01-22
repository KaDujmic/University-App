'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Enrollments', [
			{
				studentId: "f034675d-8d14-463f-a360-2e28345a212d",
				courseId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				studentId: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				courseId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				studentId: 'f034675d-8d14-463f-a360-2e28345a212d',
				courseId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				studentId: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				courseId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
