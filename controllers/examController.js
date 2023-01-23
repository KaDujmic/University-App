const { sequelize } = require('../models');
const models = require('../models');

const Model = require('../utils/factory');

exports.findAllExams = async (req, res) => {
	await Model.findAllModel(models.Exam, req, res);
};

exports.findExam = async (req, res) => {
	await Model.findModel(models.Exam, req, res);
};

exports.createExam = async (req, res) => {
	await Model.createModel(models.Exam, req, res);
};

exports.updateExam = async (req, res) => {
	await Model.updateModel(models.Exam, req, res);
};

exports.deleteExam = async (req, res) => {
	await Model.deleteModel(models.Exam, req, res);
};
