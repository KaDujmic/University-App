const express = require('express');
const examController = require('../controllers/examController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(callbackErrorHandler(examController.findAllExams))
	.post(callbackErrorHandler(examController.createExam));

router
	.route('/:id')
	.get(callbackErrorHandler(examController.findExam))
	.put(callbackErrorHandler(examController.updateExam))
	.delete(callbackErrorHandler(examController.deleteExam));

module.exports = router;
