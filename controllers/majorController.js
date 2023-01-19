const { sequelize } = require('../models');
const models = require('../models');

const Model = require('../utils/factory');

exports.findAllMajors = async (req, res) => {
	Model.findAllModel(models.Major, req, res);
};

exports.findMajor = async (req, res) => {
	Model.findModel(models.Major, req, res);
};

exports.createMajor = async (req, res) => {
	Model.createModel(models.Major, req, res);
};

exports.updateMajor = async (req, res) => {
	Model.updateModel(models.Major, req, res);
};

exports.deleteMajor = async (req, res) => {
	Model.deleteModel(models.Major, req, res);
};

exports.studentsOnMajor = async (req, res) => {
	try {
		const students = await models.Student.findAll({
			attributes: ['fullName', 'Major.name'],
			include: [models.Major],
			where: { majorId: req.params.id },
		});
		res.status(200).json(students);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
