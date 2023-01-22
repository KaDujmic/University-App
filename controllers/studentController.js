const models = require('../models');
const Model = require('../utils/factory');

exports.findAllStudents = async (req, res) => {
	Model.findAllModel(models.Student, req, res);
};

exports.findStudent = async (req, res) => {
	Model.findModel(models.Student, req, res);
};

exports.createStudent = async (req, res) => {
	Model.createModel(models.Student, req, res);
};

exports.updateStudent = async (req, res) => {
	Model.updateModel(models.Student, req, res);
};

exports.deleteStudent = async (req, res) => {
	Model.deleteModel(models.Student, req, res);
};

exports.studentEnrollments = async (req, res) => {
	try {
		const enrollments = await models.Enrollment.findAll({
			attributes: ['Student.fullName', 'Course.name'],
			include: [models.Student, models.Course],
			where: { studentId: req.params.id },
		});
		res.status(200).json(enrollments);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.studentExams = async (req, res) => {
	try {
		const exams = await models.Result.findAll({
			attributes: ['Student.fullName', 'Exam.name'],
			include: [models.Student, models.Exam],
			where: { studentId: req.params.id },
		});
		res.status(200).json(exams);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
