const express = require('express');
const courseController = require('../controllers/courseController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.findAllCourses)
  )
  .post(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.createCourse)
  );

router
  .route('/:id')
  .get(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.findCourse)
  )
  .put(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.updateCourse)
  )
  .delete(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.deleteCourse)
  );

router
  .route('/:id/students')
  .get(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.studentsOnCourse)
  );
router
  .route('/:id/professors')
  .get(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.professorsOnCourse)
  );

module.exports = router;
