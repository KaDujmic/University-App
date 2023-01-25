const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router.use(authController.isLoggedIn);

router
	.route('/')
	.get(callbackErrorHandler(studentController.findAllStudents))
	.post(callbackErrorHandler(studentController.createStudent));

router
	.route('/:id')
	.get(callbackErrorHandler(studentController.findStudent))
	.put(callbackErrorHandler(studentController.updateStudent))
	.delete(callbackErrorHandler(studentController.deleteStudent));

router
	.route('/:id/courses')
	.get(callbackErrorHandler(studentController.studentEnrollments));

router
	.route('/:id/exams')
	.get(callbackErrorHandler(studentController.studentExams));

module.exports = router;
