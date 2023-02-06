const express = require('express');
const examController = require('../controllers/examController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /*
      #swagger.tags = ['Exam']
      #swagger.responses[200] = {
        description: 'Get Exam body',
        schema: [
          {
            $ref: '#/components/schemas/ExamResponse'
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
    callbackErrorHandler(examController.findAllExams)
  )
  .post(
    /*
      #swagger.tags = ['Exam']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ExamBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Exam body, success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ExamResponse'
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
    callbackErrorHandler(examController.createExam)
  );

router
  .route('/:id')
  .get(
    /*
      #swagger.tags = ['Exam']
      #swagger.responses[200] = {
        description: 'Get Exam body, success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ExamBody'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Get Exam body, Not Found',
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
    callbackErrorHandler(examController.findExam)
  )
  .put(
    /*
      #swagger.tags = ['Exam']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ExamBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Put Exam response body on success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ExamResponse'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Update Exam, Not Found',
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
    callbackErrorHandler(examController.updateExam)
  )
  .delete(
    /*
      #swagger.tags = ['Exam']
      #swagger.responses[204] = {
        description: 'Delete Exam success, no response body'
      }
      #swagger.responses[404] = {
        description: 'Delete Exam, Not Found',
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
    callbackErrorHandler(examController.deleteExam)
  );

module.exports = router;
