const { sequelize } = require('../models');
const models = require('../models');

exports.findAllResults = async (req, res) => {
  const results = await models.Result.findAll({
    attributes: ['Student.full_name', 'Exam.name', 'grade'],
    include: [models.Student, models.Exam]
  });
  res.status(200).json({ results });
};

exports.findResult = async (req, res) => {
  const result = await models.Result.findAll({
    attributes: ['Student.full_name', 'Exam.name', 'grade'],
    include: [models.Student, models.Exam],
    where: {
      student_id: req.params.student_id,
      exam_id: req.params.exam_id
    }
  });
  res.status(200).json(result);
};

exports.createResult = async (req, res) => {
  const result = await models.Result.create(req.body);
  res.status(200).json(result);
};

exports.updateResult = async (req, res) => {
  const result = await models.Result.update(req.body, {
    where: {
      student_id: req.params.student_id,
      exam_id: req.params.exam_id
    }
  });
  res.status(200).json(result);
};

exports.deleteResult = async (req, res) => {
  const result = await models.Result.destroy({
    where: {
      student_id: req.params.student_id,
      exam_id: req.params.exam_id
    }
  });
  res.status(200).json(result);
};
