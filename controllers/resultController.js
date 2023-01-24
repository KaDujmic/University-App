const { sequelize } = require('../models');
const models = require('../models');

exports.findAllResults = async (req, res) => {
	try {
		const results = await models.Result.findAll({
			attributes: ['Student.full_name', 'Exam.name', 'grade'],
			include: [models.Student, models.Exam],
		});
		res.status(200).json({ results });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findResult = async (req, res) => {
	try {
		const result = await models.Result.findAll({
			attributes: ['Student.full_name', 'Exam.name', 'grade'],
			include: [models.Student, models.Exam],
			where: {
				student_id: req.params.student_id,
				exam_id: req.params.exam_id,
			},
		});
		res.status(200).json(result);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createResult = async (req, res) => {
	try {
		const result = await models.Result.create(req.body);
		res.status(200).json(result);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateResult = async (req, res) => {
	try {
		const result = await models.Result.update(req.body, {
			where: {
				student_id: req.params.student_id,
				exam_id: req.params.exam_id,
			},
		});
		res.status(200).json(result);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteResult = async (req, res) => {
	try {
		const result = await models.Result.destroy({
			where: {
				student_id: req.params.student_id,
				exam_id: req.params.exam_id,
			},
		});
		res.status(200).json(result);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
