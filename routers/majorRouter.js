const express = require('express');
const majorController = require('../controllers/majorController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.findAllMajors)
  )
  .post(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.createMajor)
  );

router
  .route('/:id')
  .get(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.findMajor)
  )
  .put(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.updateMajor)
  )
  .delete(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.deleteMajor)
  );

router
  .route('/:id/students')
  .get(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.studentsOnMajor)
  );

module.exports = router;
