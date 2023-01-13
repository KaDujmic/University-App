'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Majors', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			departmentId: {
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
		await queryInterface.addConstraint('Majors', {
			fields: ['departmentId'],
			type: 'foreign key',
			references: {
				table: 'Departments',
				field: 'id',
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Majors');
	},
};
