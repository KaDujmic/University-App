const models = require('../models');

exports.findAllMajors = async (req, res) => {
	try {
		const majors = await models.Major.findAll();
		res.status(200).json({ majors });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findMajor = async (req, res) => {
	try {
		const major = await models.Major.findByPk(req.params.id);
		res.status(200).json(major);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createMajor = async (req, res) => {
	try {
		const major = await models.Major.create(req.body);
		res.status(200).json(major);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateMajor = async (req, res) => {
	try {
		const major = await models.Major.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(major);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteMajor = async (req, res) => {
	try {
		const major = await models.Major.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(major);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

