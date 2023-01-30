const departmentSeed = require('../../seeders/20230116084912-department');
const majorSeed = require('../../seeders/20230116094858-major');
const professorSeed = require('../../seeders/20230116095100-professor');
const studentSeed = require('../../seeders/20230116095315-student');
const courseSeed = require('../../seeders/20230116095510-course');
const examSeed = require('../../seeders/20230116095740-exam');
const enrollmentSeed = require('../../seeders/20230116095940-enrollment');
const resultSeed = require('../../seeders/20230116100054-result');
const professorCourseSeed = require('../../seeders/20230116100228-professor-course');

module.exports = {
  examTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
    await courseSeed.up(queryInterface);
    await examSeed.up(queryInterface);
  },
  professorTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await professorSeed.up(queryInterface);
  },
  departmentTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
  },
  studentTest: async function (queryInterface) {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
    await professorSeed.up(queryInterface);
    await studentSeed.up(queryInterface);
  },
  courseTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
    await courseSeed.up(queryInterface);
  },
  majorTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
  },
  professorCourseTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
    await courseSeed.up(queryInterface);
    await professorSeed.up(queryInterface);
    await professorCourseSeed.up(queryInterface);
  },
  enrollmentTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
    await studentSeed.up(queryInterface);
    await courseSeed.up(queryInterface);
    await enrollmentSeed.up(queryInterface);
  },
  resultTest: async (queryInterface) => {
    await departmentSeed.up(queryInterface);
    await majorSeed.up(queryInterface);
    await studentSeed.up(queryInterface);
    await courseSeed.up(queryInterface);
    await examSeed.up(queryInterface);
    await resultSeed.up(queryInterface);
  }
};
