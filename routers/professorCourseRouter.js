const express = require('express');
const professor_courseController = require('../controllers/professorCourseController');
const { callbackErrorHandler } = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Professor Course'] */
    callbackErrorHandler(professor_courseController.findAllProfessorCourses)
  )
  .post(
    /* #swagger.tags = ['Professor Course'] */
    callbackErrorHandler(professor_courseController.createProfessorCourse)
  );

router
  /* #swagger.tags = ['Professor Course'] */
  .route('/:professor_id/:course_id')
  .get(
    /* #swagger.tags = ['Professor Course'] */
    callbackErrorHandler(professor_courseController.findProfessorCourse)
  )
  .put(
    /* #swagger.tags = ['Professor Course'] */
    callbackErrorHandler(professor_courseController.updateProfessorCourse)
  )
  .delete(
    /* #swagger.tags = ['Professor Course'] */
    callbackErrorHandler(professor_courseController.deleteProfessorCourse)
  );

module.exports = router;
