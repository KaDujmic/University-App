'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('major', [
			{
				id: '420ad58b-d4a2-4e71-9fa3-724759d8e7ec',
				name: 'Computer Science',
				department_id: 'fc8ea3f5-abe2-4b0c-8fb1-6a1da404f252',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: 'a49aeff9-2eec-4c76-8a06-68fa44d6dc6c',
				name: 'Chemistry',
				department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
