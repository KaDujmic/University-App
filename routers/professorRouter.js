const express = require('express');
const professorController = require('../controllers/professorController');
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
      #swagger.tags = ['Professor']
      #swagger.responses[200] = {
        description: 'Get Student body',
        schema: [
          {
            $ref: '#/components/schemas/ProfessorResponse'
          }
        ]
      }
      #swagger.responses[401] = {
        description: 'Create professor body auth failed',
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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.findAllProfessors)
  )
  .post(
    /*
      #swagger.tags = ['Professor']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorBody'
            }
          }
        }
      }
      #swagger.responses[201] = {
        description: 'Create professor body success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorResponse'
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Create professor body missing attribute',
        schema: {
          message: '\attribute_name\ is required'
        }
      }
      #swagger.responses[401] = {
        description: 'Create professor body auth failed',
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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.createProfessor)
  );

router
  .route('/:id')
  .get(
    /*
      #swagger.tags = ['Professor']
      #swagger.tags = ['Professor']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Get professor body',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorResponse'
            }
          }
        }
      }
      #swagger.responses[401] = {
        description: 'Get professor body auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Get professor body Not Found',
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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.findProfessor)
  )
  .put(
    /*
      #swagger.tags = ['Professor']
      #swagger.requestBody = {
        "required": true,
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorBody'
            }
          }
        }
      }
      #swagger.responses[200] = {
        description: 'Put professor response body on success',
        "content": {
          "application/json": {
            "schema": {
              $ref: '#/components/schemas/ProfessorResponse'
            }
          }
        }
      }
      #swagger.responses[400] = {
        description: 'Update professor email validation failed, failed',
        schema: {
          message: 'User with that email exists, please use different email!'
        }
      }
      #swagger.responses[401] = {
        description: 'Update professor, auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Update professor, Not Found',
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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.updateProfessor)
  )
  .delete(
    /*
      #swagger.tags = ['Professor']
      #swagger.responses[204] = {
        description: 'Delete professor success, no response body'
      }
      #swagger.responses[401] = {
        description: 'Update professor, auth failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Delete professor, Not Found',
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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.deleteProfessor)
  );

router
  .route('/:id/courses')
  .get(
    /*
      #swagger.tags = ['Professor']
      #swagger.responses[200] = {
        description: 'Get professor body',
        schema: [
          {
              "Professor": {
                  "id": "20c1297e-58f6-4587-842b-231ff6583086",
                  "full_name": "John Doe",
                  "address": "1st Blvd",
                  "phone_number": "+385915969819",
                  "department_id": "1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf",
                  "email": "john@example.com",
                  "password": "test1234",
                  "role": "professor",
                  "createdAt": "2023-02-02T15:14:59.095Z",
                  "updatedAt": "2023-02-02T15:14:59.095Z"
              },
              "Course": {
                  "id": "4db29f8f-9295-4369-88bf-1cc4bdf82dfd",
                  "name": "Chem 101",
                  "credit_hours": 7,
                  "major_id": "420ad58b-d4a2-4e71-9fa3-724759d8e7ec",
                  "createdAt": "2023-02-02T15:14:59.102Z",
                  "updatedAt": "2023-02-02T15:14:59.102Z"
              }
          }
        ]
      }
      #swagger.responses[401] = {
        description: 'Get professor body, Auth Failed',
        schema: {
          message: 'You are not logged in. Please log in!'
        }
      }
      #swagger.responses[404] = {
        description: 'Get professor body, Not Found',
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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.professorCourses)
  );

module.exports = router;
