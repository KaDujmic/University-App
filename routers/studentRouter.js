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
    /*
      #swagger.tags = ['Student']
      #swagger.responses[200] = {
        description: 'Get Student body',
        schema: [
          {
            $ref: '#/components/schemas/StudentResponse'
          }
        ]
      }
      #swagger.responses[401] = {
        description: 'Get Student body auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          message: 'Oops, something went wrong!'
        }
      }
    */
    callbackErrorHandler(studentController.findAllStudents)
  )
  .post(
    /*
      #swagger.tags = ['Student']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/StudentBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Student body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/StudentResponse'
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
      #swagger.responses[401] = {
        description: 'Create Student body auth failed',
        schema: {
          $ref: '#/components/schemas/AuthorizationError'
        }
      }
      #swagger.responses[500] = {
        description: 'Server error',
        schema: {
          $ref: '#/components/schemas/NotFoundError'
        }
      }
    */
    callbackErrorHandler(studentController.createStudent)
  );

router
  .route('/:id')
  .get(
    /*
      #swagger.tags = ['Student']
      #swagger.responses[200] = {
        description: 'Get Student body success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/StudentResponse'
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Get Student body auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Get Student body, Not Found',
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
    callbackErrorHandler(studentController.findStudent)
  )
  .put(
    /*
      #swagger.tags = ['Student']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/StudentBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Put student response body on success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/StudentResponse'
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Update student email validation failed, failed',
        schema: {
          message: 'User with that email exists, please use different email!'
        }
      }
      #swagger.responses[401] = {
        description: 'Update student, auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Update student, Not Found',
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
    callbackErrorHandler(studentController.updateStudent)
  )
  .delete(
    /*
      #swagger.tags = ['Student']
      #swagger.responses[204] = {
        description: 'Delete student success, no response body'
      }
      #swagger.responses[401] = {
        description: 'Update student, auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Delete student, Not Found',
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
