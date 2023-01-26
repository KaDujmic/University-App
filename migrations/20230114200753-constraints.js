'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // major_id in table Student
    await queryInterface.addConstraint('student', {
      fields: ['major_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'major',
        field: 'id'
      }
    });

    // department_id in table Major
    await queryInterface.addConstraint('major', {
      fields: ['department_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'department',
        field: 'id'
      }
    });

    // department_id in table Professor
    await queryInterface.addConstraint('professor', {
      fields: ['department_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      references: {
        table: 'department',
        field: 'id'
      }
    });

    // course_id in table Exam
    await queryInterface.addConstraint('exam', {
      fields: ['course_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'course',
        field: 'id'
      }
    });

    // major_id in table Course
    await queryInterface.addConstraint('course', {
      fields: ['major_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'major',
        field: 'id'
      }
    });

    // student_id and exam_id in table Result
    await queryInterface.addConstraint('result', {
      fields: ['student_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'student',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('result', {
      fields: ['exam_id'],
      type: 'foreign key',
      onDelete: 'cascade',
      onUpdate: 'cascade',
      references: {
        table: 'exam',
        field: 'id'
      }
    });

    // course_id and student_id in table enrollment
    await queryInterface.addConstraint('enrollment', {
      fields: ['student_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'student',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('enrollment', {
      fields: ['course_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'course',
        field: 'id'
      }
    });

    // professor_id and course_id in table ProfessorCourse
    await queryInterface.addConstraint('professor_course', {
      fields: ['professor_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'professor',
        field: 'id'
      }
    });
    await queryInterface.addConstraint('professor_course', {
      fields: ['course_id'],
      onDelete: 'cascade',
      onUpdate: 'cascade',
      type: 'foreign key',
      references: {
        table: 'course',
        field: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {}
};
