'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('professor_course', [
			{
				professor_id: '20c1297e-58f6-4587-842b-231ff6583086',
				course_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				professor_id: '20c1297e-58f6-4587-842b-231ff6583086',
				course_id: 2,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				professor_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
				course_id: 1,
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				professor_id: '805a10d7-1735-4a6c-a4cd-0be767aaeca1',
				course_id: 2,
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
