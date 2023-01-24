const express = require('express');
const professor_courseController = require('../controllers/professor-courseController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(professor_courseController.findAllProfessorCourses)
	.post(professor_courseController.createProfessorCourse);

router
	.route('/:professor_id/:course_id')
	.get(professor_courseController.findProfessorCourse)
	.put(professor_courseController.updateProfessorCourse)
	.delete(professor_courseController.deleteProfessorCourse);

module.exports = router;
