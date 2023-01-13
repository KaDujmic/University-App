'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('ProfessorCourses', {
			professorId: {
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
		await queryInterface.addConstraint('ProfessorCourses', {
			fields: ['professorId'],
			type: 'foreign key',
			references: {
				table: 'Professors',
				field: 'id',
			},
		});
		await queryInterface.addConstraint('ProfessorCourses', {
			fields: ['courseId'],
			type: 'foreign key',
			references: {
				table: 'Courses',
				field: 'id',
			},
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('ProfessorCourses');
	},
};
