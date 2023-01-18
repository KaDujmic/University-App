const { sequelize } = require('../models');
const models = require('../models');

exports.findAllDepartments = async (req, res) => {
	try {
		const departments = await models.Department.findAll();
		res.status(200).json({ departments });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findDepartment = async (req, res) => {
	try {
		const department = await models.Department.findAll({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(department);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createDepartment = async (req, res) => {
	try {
		const department = await models.Department.create(req.body);
		res.status(200).json(department);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateDepartment = async (req, res) => {
	try {
		const department = await models.Department.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(department);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteDepartment = async (req, res) => {
	try {
		const department = await models.Department.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(department);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.professorsOnDepartment = async (req, res) => {
	try {
		const students = await models.Professor.findAll({
			// attributes: ['Professor.name'],
			include: [models.Department],
			where: { id: req.params.id },
		});
		res.status(200).json(students);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
