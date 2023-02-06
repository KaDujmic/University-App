const express = require('express');
const courseController = require('../controllers/courseController');
const {
  callbackErrorHandler
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(
    /*
      #swagger.tags = ['Course']
      #swagger.responses[200] = {
        description: 'Get Course body',
        schema: [
          {
            $ref: '#/components/schemas/CourseResponse'
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
    callbackErrorHandler(courseController.findAllCourses)
  )
  .post(
    /*
      #swagger.tags = ['Course']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/CourseBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        "description": "Create Course body, success",
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/CourseResponse'
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
    callbackErrorHandler(courseController.createCourse)
  );

router
  .route('/:id')
  .get(
    /*
      #swagger.tags = ['Course']
      #swagger.responses[200] = {
        description: 'Get Course body, success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/CourseBody'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Get Course body, Not Found',
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
    callbackErrorHandler(courseController.findCourse)
  )
  .put(
    /*
      #swagger.tags = ['Course']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/CourseBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Put Course response body on success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/CourseResponse'
            }
          }
        }
      }
      #swagger.responses[404] = {
        description: 'Update Course, Not Found',
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
    callbackErrorHandler(courseController.updateCourse)
  )
  .delete(
    /*
      #swagger.tags = ['Course']
      #swagger.responses[204] = {
        description: 'Delete Course success, no response body'
      }
      #swagger.responses[404] = {
        description: 'Delete Course, Not Found',
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
    callbackErrorHandler(courseController.deleteCourse)
  );

router
  .route('/:id/Courses')
  .get(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.CoursesOnCourse)
  );
router
  .route('/:id/professors')
  .get(
    /* #swagger.tags = ['Course'] */
    callbackErrorHandler(courseController.professorsOnCourse)
  );

module.exports = router;
