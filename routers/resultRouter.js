const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(resultController.findAllResults)
	.post(resultController.createResult);

router
	.route('/:studentId/:examId')
	.get(resultController.findResult)
	.put(resultController.updateResult)
	.delete(resultController.deleteResult);


module.exports = router;
