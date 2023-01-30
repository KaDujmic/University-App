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
  .get(callbackErrorHandler(enrollmentController.findAllEnrollments))
  .post(callbackErrorHandler(enrollmentController.createEnrollment));

router
  .route('/:student_id/:course_id')
  .get(callbackErrorHandler(enrollmentController.findEnrollment))
  .put(
    callbackErrorHandler(enrollmentController.updateEnrollment)
  )
  .delete(
    callbackErrorHandler(enrollmentController.deleteEnrollment)
  );

module.exports = router;
