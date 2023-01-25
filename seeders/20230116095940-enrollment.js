'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('enrollment', [
			{
				student_id: "f034675d-8d14-463f-a360-2e28345a212d",
				course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				student_id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				student_id: 'f034675d-8d14-463f-a360-2e28345a212d',
				course_id: 'edfe47ef-c998-4c29-8800-b3abbf152eba',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				student_id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				course_id: '4db29f8f-9295-4369-88bf-1cc4bdf82dfd',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
