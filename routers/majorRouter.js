const express = require('express');
const majorController = require('../controllers/majorController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(callbackErrorHandler(majorController.findAllMajors))
	.post(callbackErrorHandler(majorController.createMajor));

router
	.route('/:id')
	.get(callbackErrorHandler(majorController.findMajor))
	.put(callbackErrorHandler(majorController.updateMajor))
	.delete(callbackErrorHandler(majorController.deleteMajor));

router
	.route('/:id/students')
	.get(callbackErrorHandler(majorController.studentsOnMajor));

module.exports = router;
