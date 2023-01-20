const express = require('express');
const professorController = require('../controllers/professorController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.isLoggedIn);

router
	.route('/')
	.get(
		authController.restrictTo('professor'),
		professorController.findAllProfessors
	)
	.post(
		authController.restrictTo('professor'),
		professorController.createProfessor
	);

router
	.route('/:id')
	.get(
		authController.restrictTo('professor'),
		professorController.findProfessor
	)
	.put(
		authController.restrictTo('professor'),
		professorController.updateProfessor
	)
	.delete(
		authController.restrictTo('professor'),
		professorController.deleteProfessor
	);

router
	.route('/:id/courses')
	.get(
		authController.restrictTo('professor'),
		professorController.professorCourses
	);

module.exports = router;
