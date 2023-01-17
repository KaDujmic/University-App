const { sequelize } = require('../models');
const models = require('../models');

exports.findAllCourses = async (req, res) => {
	try {
		const courses = await models.Course.findAll();
		res.status(200).json({ courses });
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.findCourse = async (req, res) => {
	try {
		const course = await models.Course.findByPk(req.params.id);
		res.status(200).json(course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.createCourse = async (req, res) => {
	try {
		const course = await models.Course.create(req.body);
		res.status(200).json(course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.updateCourse = async (req, res) => {
	try {
		const course = await models.Course.update(req.body, {
			where: { id: req.params.id },
		});
		res.status(200).json(course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.deleteCourse = async (req, res) => {
	try {
		const course = await models.Course.destroy({
			where: { id: req.params.id },
		});
		res.status(200).json(course);
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.studentsOnCourse = async (req, res) => {
	try {
		const students = await sequelize.query(
			`
      select 
        s."fullName",
        c."name" 
      from "Courses" c 
      join "Enrollments" e ON c.id = e."courseId" 
      join "Students" s ON e."studentId" = s.id 
      where c.id = ${req.params.id}
      `
		);
		res.status(200).json({
			// Map out course name and all students
			course: students[0].map((courses) => courses.name)[0],
			students: students[0].map((student) => student.fullName),
		});
	} catch (err) {
		res.status(404).json(err.message);
	}
};

exports.professorsOnCourse = async (req, res) => {
	try {
		const professors = await models.ProfessorCourse.findAll({
			where: { courseId: req.params.id},
			include: [models.Course, models.Professor],
		});
		res.status(200).json({ professorCourse: professors });
	} catch (err) {
		res.status(404).json(err.message);
	}
};
