'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Students', [
			{
				id: 'f034675d-8d14-463f-a360-2e28345a212d',
				fullName: 'Mike Louren',
				email: 'mike.louren@gmail.com',
				address: '1st Blvd',
				phoneNumber: '+385915969819',
				majorId: 1,
				password: 'test1234',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: '0a8b7414-4773-42d8-97ff-0c441e4e2c3e',
				fullName: 'Mike Smith',
				email: 'mike.smith@gmail.com',
				address: '4rd Blvd',
				phoneNumber: '+3859159692323',
				majorId: 2,
				password: 'test1234',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
