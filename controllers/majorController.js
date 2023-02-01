const models = require('../models');

const Model = require('../utils/factory');

exports.findAllMajors = async (req, res) => {
  await Model.findAllModel(models.Major, req, res);
};

exports.findMajor = async (req, res) => {
  await Model.findModel(models.Major, req, res);
};

exports.createMajor = async (req, res) => {
  await Model.createModel(models.Major, req, res);
};

exports.updateMajor = async (req, res) => {
  await Model.updateModel(models.Major, req, res);
};

exports.deleteMajor = async (req, res) => {
  await Model.deleteModel(models.Major, req, res);
};

exports.studentsOnMajor = async (req, res) => {
  const students = await models.Student.findAll({
    attributes: ['full_name', 'major_id'],
    where: { major_id: req.params.id }
  });
  res.status(200).json(students);
};
