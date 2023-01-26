const models = require('../models');

const Model = require('../utils/factory');

exports.findAllCourses = async (req, res) => {
  await Model.findAllModel(models.Course, req, res);
};

exports.findCourse = async (req, res) => {
  await Model.findModel(models.Course, req, res);
};

exports.createCourse = async (req, res) => {
  await Model.createModel(models.Course, req, res);
};

exports.updateCourse = async (req, res) => {
  await Model.updateModel(models.Course, req, res);
};

exports.deleteCourse = async (req, res) => {
  await Model.deleteModel(models.Course, req, res);
};

exports.studentsOnCourse = async (req, res) => {
  const students = await models.Enrollment.findAll({
    attributes: ['Course.name', 'Student.full_name'],
    where: { course_id: req.params.id },
    include: [models.Course, models.Student]
  });
  res.status(200).json({
    course: students[0].Course.name,
    students
  });
};

exports.professorsOnCourse = async (req, res) => {
  const professors = await models.ProfessorCourse.findAll({
    attributes: ['Course.name', 'Course.name'],
    where: { course_id: req.params.id },
    include: [models.Professor, models.Course]
  });
  res.status(200).json({ professorCourse: professors });
};
