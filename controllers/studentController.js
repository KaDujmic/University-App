const models = require('../models');

exports.findAllStudents = async (req, res) => {
	try {
		const students = await models.Student.findAll();
		res.status(200).json({ students });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findStudent = async (req, res) => {
	try {
		const Student = await models.Student.findByPk(req.params.id);
		res.status(200).json(Student);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createStudent = async (req, res) => {
	try {
		const Student = await models.Student.create(req.body);
		res.status(200).json(Student);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateStudent = async (req, res) => {
	try {
		const Student = await models.Student.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(Student);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteStudent = async (req, res) => {
	try {
		const Student = await models.Student.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(Student);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.studentEnrollments = async (req, res) => {
	try {
		const enrollments = await models.sequelize.query(
			`
			SELECT 
				s."fullName" as Student,
				c."name" as Course
			FROM "Courses" c
			JOIN "Enrollments" e ON  e."courseId" = c.id 
			JOIN "Students" s ON	s.id = e."studentId" 
			WHERE e."studentId" = ${req.params.id}
			`
		);
		res.status(200).json(enrollments[0]);
	} catch (err) {
		res.status(404).json(err.message);
	}
};
