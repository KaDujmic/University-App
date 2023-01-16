const express = require('express');
const professorController = require('../controllers/professorController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(professorController.findAllProfessors)
	.post(professorController.createProfessor);

router
	.route('/:id')
	.get(professorController.findProfessor)
	.put(professorController.updateProfessor)
	.delete(professorController.deleteProfessor);

module.exports = router;
