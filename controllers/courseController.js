const { sequelize } = require('../models');
const models = require('../models');

const Model = require('../utils/factory');

exports.findAllCourses = async (req, res) => {
	Model.findAllModel(models.Course, req, res);
};

exports.findCourse = async (req, res) => {
	Model.findModel(models.Course, req, res);
};

exports.createCourse = async (req, res) => {
	Model.createModel(models.Course, req, res);
};

exports.updateCourse = async (req, res) => {
	Model.updateModel(models.Course, req, res);
};

exports.deleteCourse = async (req, res) => {
	Model.deleteModel(models.Course, req, res);
};

exports.studentsOnCourse = async (req, res) => {
	try {
		const students = await models.Enrollment.findAll({
			attributes: ['Course.name', 'Student.fullName'],
			where: { courseId: req.params.id},
			include: [models.Course, models.Student],
		});
		res.status(200).json({
			course: students[0].Course.name,
			students: students,
		});
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.professorsOnCourse = async (req, res) => {
	try {
		const professors = await models.CourseCourse.findAll({
			attributes: ['Course.name', 'Course.name'],
			where: { courseId: req.params.id},
			include: [models.Course, models.Course],
		});
		res.status(200).json({ professorCourse: professors });
	} catch (err) {
		res.status(404).json(err.message);
	}
};
