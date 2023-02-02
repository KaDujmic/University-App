const express = require('express');
const resultController = require('../controllers/resultController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Result'] */
    callbackErrorHandler(resultController.findAllResults)
  )
  .post(
    /* #swagger.tags = ['Result'] */
    callbackErrorHandler(resultController.createResult)
  );

router
  .route('/:student_id/:exam_id')
  .get(
    /* #swagger.tags = ['Result'] */
    callbackErrorHandler(resultController.findResult)
  )
  .put(
    /* #swagger.tags = ['Result'] */
    callbackErrorHandler(resultController.updateResult)
  )
  .delete(
    /* #swagger.tags = ['Result'] */
    callbackErrorHandler(resultController.deleteResult)
  );

module.exports = router;
