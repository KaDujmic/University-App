const models = require('../models');

exports.findAllProfessorCourses = async (req, res) => {
  const professor_courses = await models.ProfessorCourse.findAll({
    attributes: ['Professor.name', 'Course.name'],
    include: [models.Professor, models.Course]
  });
  res.status(200).json({ professor_courses });
};

exports.findProfessorCourse = async (req, res) => {
  const professor_course = await models.ProfessorCourse.findAll({
    attributes: ['Professor.name', 'Course.name'],
    include: [models.Professor, models.Course],
    where: {
      professor_id: req.params.professor_id,
      course_id: req.params.course_id
    }
  });
  res.status(200).json(professor_course);
};

exports.createProfessorCourse = async (req, res) => {
  const professor_course = await models.ProfessorCourse.create(
    req.body
  );
  res.status(200).json(professor_course);
};

exports.updateProfessorCourse = async (req, res) => {
  const professor_course = await models.ProfessorCourse.update(
    req.body,
    {
      where: {
        professor_id: req.params.professor_id,
        course_id: req.params.course_id
      }
    }
  );
  res.status(200).json(professor_course);
};

exports.deleteProfessorCourse = async (req, res) => {
  const professor_course = await models.ProfessorCourse.destroy({
    where: {
      professor_id: req.params.professor_id,
      course_id: req.params.course_id
    }
  });
  res.status(200).json(professor_course);
};
