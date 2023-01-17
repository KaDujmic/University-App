const models = require('../models');

exports.findAllProfessors = async (req, res) => {
	try {
		const professors = await models.Professor.findAll();
		res.status(200).json({ professors });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findProfessor = async (req, res) => {
	try {
		const professor = await models.Professor.findByPk(req.params.id);
		res.status(200).json(professor);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createProfessor = async (req, res) => {
	try {
		const professor = await models.Professor.create(req.body);
		res.status(200).json(professor);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateProfessor = async (req, res) => {
	try {
		const professor = await models.Professor.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(professor);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteProfessor = async (req, res) => {
	try {
		const professor = await models.Professor.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(professor);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.professorCourses = async (req, res) => {
	try {
		const professorCourses = await models.ProfessorCourse.findAll({
			attributes: ['Professor.name', 'Course.name'],
			include: [models.Professor, models.Course],
			where: { professorId: req.params.id },
		});
		res.status(200).json(professorCourses);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
