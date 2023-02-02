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
        description: 'Get professor body',
        schema: [
          {
            id: '20c1297e-58f6-4587-842b-231ff6583086',
            full_name: 'John Doe',
            address: '1st Blvd',
            email: 'john@example.com',
            phone_number: '+385915969819',
            department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
          }
        ]
      }
    */
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.findAllProfessors)
  )
  .post(
    /*
      #swagger.tags = ['Professor']
      #swagger.parameters['professor_body'] = {
        in: 'body',
        description: 'Professor body example',
        schema: {
          full_name: 'John Doe',
          address: '1st Blvd',
          email: 'john@example.com',
          phone_number: '+385915969819',
          department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
          password: 'test1234'
        }
      }
      #swagger.responses[201] = {
        description: 'Create professor body success',
        schema: {
          id: '20c1297e-58f6-4587-842b-231ff6583086',
          full_name: 'John Doe',
          address: '1st Blvd',
          email: 'john@example.com',
          phone_number: '+385915969819',
          department_id: '1076625a-bcc5-49ea-b0e5-9ce3f8f0b2bf',
          password: 'test1234'
        }
      }
      #swagger.responses[400] = {
        description: 'Create professor body missing attribute',
        schema: {
          message: '\attribute_name\ is required'
        }
      }
      #swagger.responses[403] = {
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
    // #swagger.tags = ['Professor']
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.findProfessor)
  )
  .put(
    // #swagger.tags = ['Professor']
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.updateProfessor)
  )
  .delete(
    // #swagger.tags = ['Professor']
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.deleteProfessor)
  );

router
  .route('/:id/courses')
  .get(
    // #swagger.tags = ['Professor']
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.professorCourses)
  );

module.exports = router;
