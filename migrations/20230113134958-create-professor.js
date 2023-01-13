'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Professors', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			address: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			phoneNumber: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			departmentId: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
		await queryInterface.addConstraint('Professors', {
			fields: ['departmentId'],
			type: 'foreign key',
			references: {
				table: 'Departments',
				field: 'id',
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Professors');
	},
};
