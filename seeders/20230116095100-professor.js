'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		return queryInterface.bulkInsert('Professors', [
			{
				name: 'John Doe',
				address: '1st Blvd',
				email: 'john@example.com',
				phoneNumber: '+385915969819',
				departmentId: 1,
				password: 'test1234',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Mike Smith',
				address: '4rd Blvd',
				email: 'mike@example.com',
				phoneNumber: '+3859159692323',
				departmentId: 2,
				password: 'test1234',
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {},
};
