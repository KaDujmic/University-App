const express = require('express');
const examController = require('../controllers/examController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(examController.findAllExams)
  )
  .post(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(examController.createExam)
  );

router
  /* #swagger.tags = ['Exam'] */
  .route('/:id')
  .get(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(examController.findExam)
  )
  .put(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(examController.updateExam)
  )
  .delete(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(examController.deleteExam)
  );

module.exports = router;
