'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('student', [
			{
				id: 'f034675d-8d14-463f-a360-2e28345a212d',
				full_name: 'Mike Louren',
				email: 'mike.louren@gmail.com',
				address: '1st Blvd',
				phone_number: '+385915969819',
				major_id: 1,
				password: 'test1234',
				created_at: new Date(),
				updated_at: new Date(),
			},
			{
				id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				full_name: 'Mike Smith',
				email: 'mike.smith@gmail.com',
				address: '4rd Blvd',
				phone_number: '+3859159692323',
				major_id: 2,
				password: 'test1234',
				created_at: new Date(),
				updated_at: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
