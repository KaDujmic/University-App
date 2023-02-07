const express = require('express');
const resultController = require('../controllers/resultController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /*
      #swagger.tags = ['Result']
      #swagger.responses[200] = {
        description: 'Get Result body',
        schema: [
          {
            $ref: '#/components/schemas/ResultResponse',
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
    callbackErrorHandler(resultController.findAllResults)
  )
  .post(
    /*
      #swagger.tags = ['Result']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ResultBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Student body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ResultResponse',
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
    callbackErrorHandler(resultController.createResult)
  );

router
  .route('/:student_id/:exam_id')
  .get(
    /*
      #swagger.tags = ['Result']
      #swagger.responses[200] = {
        "description": "Create Result body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ResultResponse',
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Get Result body, Not Found',
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
    callbackErrorHandler(resultController.findResult)
  )
  .put(
    /*
      #swagger.tags = ['Result']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ResultBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Student body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ResultResponse',
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
    callbackErrorHandler(resultController.updateResult)
  )
  .delete(
    /*
      #swagger.tags = ['Result']
      #swagger.responses[204] = {
        description: 'Delete Result success, no response body'
      }
      #swagger.responses[404] = {
        description: 'Delete Result, Not Found',
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
    callbackErrorHandler(resultController.deleteResult)
  );

module.exports = router;
