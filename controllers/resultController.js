const { sequelize } = require('../models');
const models = require('../models');

exports.findAllResults = async (req, res) => {
	try {
		const results = await models.Result.findAll({
      attributes: ['Student.fullName', 'Exam.name', 'grade'],
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
      attributes: ['Student.fullName', 'Exam.name', 'grade'],
      include: [models.Student, models.Exam],
			where: {
				studentId: req.params.studentId,
				examId: req.params.examId,
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
				studentId: req.params.studentId,
				examId: req.params.examId,
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
				studentId: req.params.studentId,
				examId: req.params.examId,
			},
		});
		res.status(200).json(result);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

