'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// majorId in table Student
		await queryInterface.addConstraint('Students', {
			fields: ['majorId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Majors',
				field: 'id',
			},
		});

		// departmentId in table Major
		await queryInterface.addConstraint('Majors', {
			fields: ['departmentId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Departments',
				field: 'id',
			},
		});

		// departmentId in table Professor
		await queryInterface.addConstraint('Professors', {
			fields: ['departmentId'],
			type: 'foreign key',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			references: {
				table: 'Departments',
				field: 'id',
			},
		});

		// courseId in table Exam
		await queryInterface.addConstraint('Exams', {
			fields: ['courseId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Courses',
				field: 'id',
			},
		});

		// majorId in table Course
		await queryInterface.addConstraint('Courses', {
			fields: ['majorId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Majors',
				field: 'id',
			},
		});

		// studentId and examId in table Result
		await queryInterface.addConstraint('Results', {
			fields: ['studentId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Students',
				field: 'id',
			},
		});
		await queryInterface.addConstraint('Results', {
			fields: ['examId'],
			type: 'foreign key',
			onDelete: 'cascade',
			onUpdate: 'cascade',
			references: {
				table: 'Exams',
				field: 'id',
			},
		});

		// courseId and studentId in table Enrollments
		await queryInterface.addConstraint('Enrollments', {
			fields: ['studentId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Students',
				field: 'id',
			},
		});
		await queryInterface.addConstraint('Enrollments', {
			fields: ['courseId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Courses',
				field: 'id',
			},
		});

		// professorId and courseId in table ProfessorCourse
		await queryInterface.addConstraint('ProfessorCourses', {
			fields: ['professorId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Professors',
				field: 'id',
			},
		});
		await queryInterface.addConstraint('ProfessorCourses', {
			fields: ['courseId'],
			onDelete: 'cascade',
			onUpdate: 'cascade',
			type: 'foreign key',
			references: {
				table: 'Courses',
				field: 'id',
			},
		});
	},

	async down(queryInterface, Sequelize) {},
};
