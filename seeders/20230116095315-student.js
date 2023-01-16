'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Students', [
			{
				fullName: 'Mike Louren',
        email: 'mike.louren@gmail.com',
				address: '1st Blvd',
				phoneNumber: '+385915969819',
				majorId: 1,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				fullName: 'Mike Smith',
        email: 'mike.smith@gmail.com',
				address: '4rd Blvd',
				phoneNumber: '+3859159692323',
				majorId: 2,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
