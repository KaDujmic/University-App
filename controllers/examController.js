const { sequelize } = require('../models');
const models = require('../models');

exports.findAllExams = async (req, res) => {
	try {
		const exams = await models.Exam.findAll({
			include: [models.Course],
		});
		res.status(200).json({ exams });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findExam = async (req, res) => {
	try {
		const exam = await models.Exam.findAll({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(exam);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createExam = async (req, res) => {
	try {
		const exam = await models.Exam.create(req.body);
		res.status(200).json(exam);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateExam = async (req, res) => {
	try {
		const exam = await models.Exam.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(exam);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteExam = async (req, res) => {
	try {
		const exam = await models.Exam.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(exam);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
