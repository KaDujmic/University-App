const { sequelize } = require('../models');
const models = require('../models');

const Model = require('../utils/factory');

exports.findAllExams = async (req, res) => {
	Model.findAllModel(models.Exam, req, res);
};

exports.findExam = async (req, res) => {
	Model.findModel(models.Exam, req, res);
};

exports.createExam = async (req, res) => {
	Model.createModel(models.Exam, req, res);
};

exports.updateExam = async (req, res) => {
	Model.updateModel(models.Exam, req, res);
};

exports.deleteExam = async (req, res) => {
	Model.deleteModel(models.Exam, req, res);
};
