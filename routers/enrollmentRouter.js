const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');
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
      #swagger.tags = ['Enrollment']
      #swagger.responses[200] = {
        description: 'Get Enrollment body',
        schema: [
          {
            $ref: '#/components/schemas/EnrollmentResponse',
          }
        ]
      }
      #swagger.responses[401] = {
        description: 'Get Enrollment body auth failed',
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
    callbackErrorHandler(enrollmentController.findAllEnrollments)
  )
  .post(
    /*
      #swagger.tags = ['Enrollment']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/EnrollmentBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Student body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/EnrollmentResponse',
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
    callbackErrorHandler(enrollmentController.createEnrollment)
  );

router
  .route('/:student_id/:course_id')
  .get(
    /*
      #swagger.tags = ['Enrollment']
      #swagger.responses[200] = {
        "description": "Create Enrollment body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/EnrollmentResponse',
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Create Enrollment body auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Get Enrollment body, Not Found',
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
    callbackErrorHandler(enrollmentController.findEnrollment)
  )
  .put(
    /*
      #swagger.tags = ['Enrollment']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/EnrollmentBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Student body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/EnrollmentResponse',
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
    callbackErrorHandler(enrollmentController.updateEnrollment)
  )
  .delete(
    /*
      #swagger.tags = ['Enrollment']
      #swagger.responses[204] = {
        description: 'Delete Enrollment success, no response body'
      }
      #swagger.responses[401] = {
        description: 'Update Enrollment, auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Delete Enrollment, Not Found',
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
    callbackErrorHandler(enrollmentController.deleteEnrollment)
  );

module.exports = router;
