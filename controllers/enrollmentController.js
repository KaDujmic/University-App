const { sequelize } = require('../models');
const models = require('../models');

exports.findAllEnrollments = async (req, res) => {
	try {
		const enrollments = await models.Enrollment.findAll({
			include: [models.Student, models.Course],
		});
		res.status(200).json({ enrollments });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findEnrollment = async (req, res) => {
	try {
		const enrollment = await models.Enrollment.findAll({
			where: {
				student_id: req.params.student_id,
				course_id: req.params.course_id,
			},
		});
		res.status(200).json(enrollment);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createEnrollment = async (req, res) => {
	try {
		const enrollment = await models.Enrollment.create(req.body);
		res.status(200).json(enrollment);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateEnrollment = async (req, res) => {
	try {
		const enrollment = await models.Enrollment.update(req.body, {
			where: {
				student_id: req.params.student_id,
				course_id: req.params.course_id,
			},
		});
		res.status(200).json(enrollment);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteEnrollment = async (req, res) => {
	try {
		const enrollment = await models.Enrollment.destroy({
			where: {
				student_id: req.params.student_id,
				course_id: req.params.course_id,
			},
		});
		res.status(200).json(enrollment);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
