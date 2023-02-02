const express = require('express');
const majorController = require('../controllers/majorController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(majorController.findAllMajors)
  )
  .post(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(majorController.createMajor)
  );

router
  /* #swagger.tags = ['Major'] */
  .route('/:id')
  .get(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(majorController.findMajor)
  )
  .put(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(majorController.updateMajor)
  )
  .delete(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(majorController.deleteMajor)
  );

router
  /* #swagger.tags = ['Major'] */
  .route('/:id/students')
  .get(
    /* #swagger.tags = ['Exam'] */
    callbackErrorHandler(majorController.studentsOnMajor)
  );

module.exports = router;
