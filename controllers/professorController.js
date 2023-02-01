const models = require('../models');
const Model = require('../utils/factory');

exports.findAllProfessors = async (req, res) => {
  await Model.findAllModel(models.Professor, req, res);
};

exports.findProfessor = async (req, res) => {
  await Model.findModel(models.Professor, req, res);
};

exports.createProfessor = async (req, res) => {
  await Model.createModel(models.Professor, req, res);
};

exports.updateProfessor = async (req, res) => {
  await Model.updateModel(models.Professor, req, res);
};

exports.deleteProfessor = async (req, res) => {
  await Model.deleteModel(models.Professor, req, res);
};

exports.professorCourses = async (req, res) => {
  const professorCourses = await models.ProfessorCourse.findAll({
    attributes: ['Professor.full_name', 'Course.name'],
    include: [models.Professor, models.Course],
    where: { professor_id: req.params.id }
  });
  res.status(200).json(professorCourses);
};
