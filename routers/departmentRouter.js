const express = require('express');
const departmentController = require('../controllers/departmentController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.findAllDepartments)
  )
  .post(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.createDepartment)
  );

router
  .route('/:id')
  .get(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.findDepartment)
  )
  .put(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.updateDepartment)
  )
  .delete(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.deleteDepartment)
  );

router
  .route('/:id/professors')
  .get(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.professorsOnDepartment)
  );

module.exports = router;
