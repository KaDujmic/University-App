const express = require('express');
const majorController = require('../controllers/majorController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /*
      #swagger.tags = ['Major']
      #swagger.responses[200] = {
        description: 'Get Major body',
        schema: [
          {
            $ref: '#/components/schemas/MajorResponse'
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
    callbackErrorHandler(majorController.findAllMajors)
  )
  .post(
    /*
      #swagger.tags = ['Major']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/MajorBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Major body, success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/MajorResponse'
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
    callbackErrorHandler(majorController.createMajor)
  );

router
  .route('/:id')
  .get(
    /*
      #swagger.tags = ['Major']
      #swagger.responses[200] = {
        description: 'Get Major body, success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/MajorBody'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Get Major body, Not Found',
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
    callbackErrorHandler(majorController.findMajor)
  )
  .put(
    /*
      #swagger.tags = ['Major']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/MajorBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Put Major response body on success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/MajorResponse'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Update Major, Not Found',
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
    callbackErrorHandler(majorController.updateMajor)
  )
  .delete(
    /*
      #swagger.tags = ['Major']
      #swagger.responses[204] = {
        description: 'Delete Major success, no response body'
      }
      #swagger.responses[404] = {
        description: 'Delete Major, Not Found',
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
    callbackErrorHandler(majorController.deleteMajor)
  );

router
  .route('/:id/students')
  .get(
    /* #swagger.tags = ['Major'] */
    callbackErrorHandler(majorController.studentsOnMajor)
  );

module.exports = router;
