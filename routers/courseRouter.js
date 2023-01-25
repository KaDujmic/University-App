const express = require('express');
const courseController = require('../controllers/courseController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(callbackErrorHandler(courseController.findAllCourses))
	.post(callbackErrorHandler(courseController.createCourse));

router
	.route('/:id')
	.get(callbackErrorHandler(courseController.findCourse))
	.put(callbackErrorHandler(courseController.updateCourse))
	.delete(callbackErrorHandler(courseController.deleteCourse));

router
	.route('/:id/students')
	.get(callbackErrorHandler(courseController.studentsOnCourse));
router
	.route('/:id/professors')
	.get(callbackErrorHandler(courseController.professorsOnCourse));

module.exports = router;
