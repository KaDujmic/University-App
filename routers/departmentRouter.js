const express = require('express');
const departmentController = require('../controllers/departmentController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /*
      #swagger.tags = ['Department']
      #swagger.responses[200] = {
        description: 'Get Department body',
        schema: [
          {
            $ref: '#/components/schemas/DepartmentResponse'
          }
        ]
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          message: 'Oops, something went wrong!'
        }
      }
    */
    callbackErrorHandler(departmentController.findAllDepartments)
  )
  .post(
    /*
      #swagger.tags = ['Department']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/DepartmentBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Department body, success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/DepartmentResponse'
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Invalid request was sent',
        schema: {
          $ref: '#/components/schemas/ValidationError'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          $ref: '#/components/schemas/NotFoundError'
        }
      }
    */
    callbackErrorHandler(departmentController.createDepartment)
  );

router
  .route('/:id')
  .get(
    /*
      #swagger.tags = ['Department']
      #swagger.responses[200] = {
        description: 'Get Department body, success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/DepartmentBody'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Get Department body, Not Found',
        schema: {
          message: 'Model with that ID field does not exist'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          message: 'Oops, something went wrong!'
        }
      }
    */
    callbackErrorHandler(departmentController.findDepartment)
  )
  .put(
    /*
      #swagger.tags = ['Department']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/DepartmentBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Put Department response body on success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/DepartmentResponse'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Update Department, Not Found',
        schema: {
          message: 'Model with that ID field does not exist'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          message: 'Oops, something went wrong!'
        }
      }
    */
    callbackErrorHandler(departmentController.updateDepartment)
  )
  .delete(
    /*
      #swagger.tags = ['Department']
      #swagger.responses[204] = {
        description: 'Delete Department success, no response body'
      }
      #swagger.responses[404] = {
        description: 'Delete Department, Not Found',
        schema: {
          message: 'Model with that ID field does not exist'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          message: 'Oops, something went wrong!'
        }
      }
    */
    callbackErrorHandler(departmentController.deleteDepartment)
  );

router
  .route('/:id/professors')
  .get(
    /* #swagger.tags = ['Department'] */
    callbackErrorHandler(departmentController.professorsOnDepartment)
  );

module.exports = router;
