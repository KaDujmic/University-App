'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Enrollments', {
			studentId: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			courseId: {
				allowNull: false,
				primaryKey: true,
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
		await queryInterface.addConstraint('Enrollments', {
			fields: ['studentId'],
			type: 'foreign key',
			references: {
				table: 'Students',
				field: 'id',
			},
		});
		await queryInterface.addConstraint('Enrollments', {
			fields: ['courseId'],
			type: 'foreign key',
			references: {
				table: 'Courses',
				field: 'id',
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Enrollments');
	},
};
