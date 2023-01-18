const express = require('express');
const professor_courseController = require('../controllers/professor-courseController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(professor_courseController.findAllProfessorCourses)
	.post(professor_courseController.createProfessorCourse);

router
	.route('/:professorId/:courseId')
	.get(professor_courseController.findProfessorCourse)
	.put(professor_courseController.updateProfessorCourse)
	.delete(professor_courseController.deleteProfessorCourse);


module.exports = router;
