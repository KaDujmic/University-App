const models = require('../models');
const Model = require('../utils/factory');

exports.findAllStudents = async (req, res) => {
	await Model.findAllModel(models.Student, req, res);
};

exports.findStudent = async (req, res) => {
	await Model.findModel(models.Student, req, res);
};

exports.createStudent = async (req, res) => {
	await Model.createModel(models.Student, req, res);
};

exports.updateStudent = async (req, res) => {
	await Model.updateModel(models.Student, req, res);
};

exports.deleteStudent = async (req, res) => {
	await Model.deleteModel(models.Student, req, res);
};

exports.studentEnrollments = async (req, res) => {
	try {
		const enrollments = await models.Enrollment.findAll({
			attributes: ['Student.full_name', 'Course.name'],
			include: [models.Student, models.Course],
			where: { student_id: req.params.id },
		});
		res.status(200).json(enrollments);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.studentExams = async (req, res) => {
	try {
		const exams = await models.Result.findAll({
			attributes: ['Student.full_name', 'Exam.name'],
			include: [models.Student, models.Exam],
			where: { student_id: req.params.id },
		});
		res.status(200).json(exams);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
