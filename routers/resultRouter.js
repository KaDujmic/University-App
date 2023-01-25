const express = require('express');
const resultController = require('../controllers/resultController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(callbackErrorHandler(resultController.findAllResults))
	.post(callbackErrorHandler(resultController.createResult));

router
	.route('/:student_id/:exam_id')
	.get(callbackErrorHandler(resultController.findResult))
	.put(callbackErrorHandler(resultController.updateResult))
	.delete(callbackErrorHandler(resultController.deleteResult));

module.exports = router;
