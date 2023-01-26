const express = require('express');
const professor_courseController = require('../controllers/professor-courseController');
const { callbackErrorHandler } = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(callbackErrorHandler(professor_courseController.findAllProfessorCourses))
  .post(callbackErrorHandler(professor_courseController.createProfessorCourse));

router
  .route('/:professor_id/:course_id')
  .get(callbackErrorHandler(professor_courseController.findProfessorCourse))
  .put(callbackErrorHandler(professor_courseController.updateProfessorCourse))
  .delete(callbackErrorHandler(professor_courseController.deleteProfessorCourse));

module.exports = router;
