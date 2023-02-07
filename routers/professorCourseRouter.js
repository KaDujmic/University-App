const express = require('express');
const professor_courseController = require('../controllers/professorCourseController');
const { callbackErrorHandler } = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /*
      #swagger.tags = ['ProfessorCourse']
      #swagger.responses[200] = {
        description: 'Get ProfessorCourse body',
        schema: [
          {
            $ref: '#/components/schemas/ProfessorCourseResponse',
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
    callbackErrorHandler(professor_courseController.findAllProfessorCourses)
  )
  .post(
     /*
      #swagger.tags = ['ProfessorCourse']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorCourseBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create ProfessorCourse body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorCourseResponse',
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
    callbackErrorHandler(professor_courseController.createProfessorCourse)
  );

router
  .route('/:professor_id/:course_id')
  .get(
    /*
      #swagger.tags = ['ProfessorCourse']
      #swagger.responses[200] = {
        "description": "Create ProfessorCourse body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorCourseResponse',
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Get ProfessorCourse body, Not Found',
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
    callbackErrorHandler(professor_courseController.findProfessorCourse)
  )
  .put(
    /*
      #swagger.tags = ['ProfessorCourse']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorCourseBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create ProfessorCourse body success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorCourseResponse',
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
    callbackErrorHandler(professor_courseController.updateProfessorCourse)
  )
  .delete(
    /*
      #swagger.tags = ['ProfessorCourse']
      #swagger.responses[204] = {
        description: 'Delete ProfessorCourse success, no response body'
      }
      #swagger.responses[404] = {
        description: 'Delete ProfessorCourse, Not Found',
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
    callbackErrorHandler(professor_courseController.deleteProfessorCourse)
  );

module.exports = router;
