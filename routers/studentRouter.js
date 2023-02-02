const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router.use(authController.isLoggedIn);

router
  .route('/')
  .get(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.findAllStudents)
  )
  .post(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.createStudent)
  );

router
  .route('/:id')
  .get(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.findStudent)
  )
  .put(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.updateStudent)
  )
  .delete(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.deleteStudent)
  );

router
  .route('/:id/courses')
  .get(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.studentEnrollments)
  );

router
  .route('/:id/exams')
  .get(
    /* #swagger.tags = ['Student'] */
    callbackErrorHandler(studentController.studentExams)
  );

module.exports = router;
