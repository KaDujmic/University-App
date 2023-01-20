const express = require('express');
const professorController = require('../controllers/professorController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.isLoggedIn);

router
	.route('/')
	.get(professorController.findAllProfessors)
	.post(professorController.createProfessor);

router
	.route('/:id')
	.get(professorController.findProfessor)
	.put(professorController.updateProfessor)
	.delete(professorController.deleteProfessor);

router
	.route('/:id/courses')
	.get(professorController.professorCourses);

module.exports = router;
