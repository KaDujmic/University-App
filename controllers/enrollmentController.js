const models = require('../models');

exports.findAllEnrollments = async (req, res) => {
  const enrollments = await models.Enrollment.findAll({
    attributes: ['Student.full_name', 'Course.name'],
    include: [models.Student, models.Course]
  });
  res.status(200).json(enrollments);
};

exports.findEnrollment = async (req, res) => {
  const enrollment = await models.Enrollment.findOne({
    where: {
      student_id: req.params.student_id,
      course_id: req.params.course_id
    },
    attributes: ['Student.full_name', 'Course.name'],
    include: [models.Student, models.Course]
  });
  res.status(200).json(enrollment);
};

exports.createEnrollment = async (req, res) => {
  const enrollment = await models.Enrollment.create(req.body);
  res.status(201).json(enrollment);
};

exports.updateEnrollment = async (req, res) => {
  const enrollment = await models.Enrollment.update(req.body, {
    where: {
      student_id: req.params.student_id,
      course_id: req.params.course_id
    },
    attributes: ['Student.full_name', 'Course.name'],
    include: [models.Student, models.Course]
  });
  res.status(200).json(enrollment);
};

exports.deleteEnrollment = async (req, res) => {
  const enrollment = await models.Enrollment.destroy({
    where: {
      student_id: req.params.student_id,
      course_id: req.params.course_id
    }
  });
  res.status(204).json(enrollment);
};
