const { sequelize } = require('../models');
const models = require('../models');

const Model = require('../utils/factory');

exports.findAllDepartments = async (req, res) => {
	await Model.findAllModel(models.Department, req, res);
};

exports.findDepartment = async (req, res) => {
	await Model.findModel(models.Department, req, res);
};

exports.createDepartment = async (req, res) => {
	await Model.createModel(models.Department, req, res);
};

exports.updateDepartment = async (req, res) => {
	await Model.updateModel(models.Department, req, res);
};

exports.deleteDepartment = async (req, res) => {
	await Model.deleteModel(models.Department, req, res);
};

exports.professorsOnDepartment = async (req, res) => {
	const students = await models.Professor.findAll({
		// attributes: ['Department.name'],
		// include: [models.Department],
		where: { departmentId: req.params.id },
	});
	res.status(200).json(students);
};
