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
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.findAllProfessors)
  )
  .post(
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.createProfessor)
  );

router
  .route('/:id')
  .get(
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.findProfessor)
  )
  .put(
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.updateProfessor)
  )
  .delete(
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.deleteProfessor)
  );

router
  .route('/:id/courses')
  .get(
    authController.restrictTo('professor'),
    callbackErrorHandler(professorController.professorCourses)
  );

module.exports = router;
