const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(studentController.findAllStudents)
	.post(studentController.createStudent);

router
	.route('/:id')
	.get(studentController.findStudent)
	.put(studentController.updateStudent)
	.delete(studentController.deleteStudent);

	router
	.route('/:id/courses')
	.get(studentController.studentEnrollments);

module.exports = router;
