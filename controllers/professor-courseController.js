const { sequelize } = require('../models');
const models = require('../models');

exports.findAllProfessorCourses = async (req, res) => {
	try {
		const professor_courses = await models.ProfessorCourse.findAll({
      attributes: ['Professor.name', 'Course.name'],
			include: [models.Professor, models.Course],
		});
		res.status(200).json({ professor_courses });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findProfessorCourse = async (req, res) => {
	try {
		const professor_course = await models.ProfessorCourse.findAll({
      attributes: ['Professor.name', 'Course.name'],
      include: [models.Professor, models.Course],
			where: {
				professorId: req.params.professorId,
				courseId: req.params.courseId,
			},
		});
		res.status(200).json(professor_course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createProfessorCourse = async (req, res) => {
	try {
		const professor_course = await models.ProfessorCourse.create(req.body);
		res.status(200).json(professor_course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateProfessorCourse = async (req, res) => {
	try {
		const professor_course = await models.ProfessorCourse.update(req.body, {
			where: {
				professorId: req.params.professorId,
				courseId: req.params.courseId,
			},
		});
		res.status(200).json(professor_course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteProfessorCourse = async (req, res) => {
	try {
		const professor_course = await models.ProfessorCourse.destroy({
			where: {
				professorId: req.params.professorId,
				courseId: req.params.courseId,
			},
		});
		res.status(200).json(professor_course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

