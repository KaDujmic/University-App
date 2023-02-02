const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
const authController = require('../controllers/authController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router.use(authController.isLoggedIn);

router
  .route('/')
  .get(
    /* #swagger.tags = ['Enrollment'] */
    callbackErrorHandler(enrollmentController.findAllEnrollments)
  )
  .post(
    /* #swagger.tags = ['Enrollment'] */
    callbackErrorHandler(enrollmentController.createEnrollment)
  );

router
  .route('/:student_id/:course_id')
  .get(
    /* #swagger.tags = ['Enrollment'] */
    callbackErrorHandler(enrollmentController.findEnrollment)
  )
  .put(
    /* #swagger.tags = ['Enrollment'] */
    callbackErrorHandler(enrollmentController.updateEnrollment)
  )
  .delete(
    /* #swagger.tags = ['Enrollment'] */
    callbackErrorHandler(enrollmentController.deleteEnrollment)
  );

module.exports = router;
