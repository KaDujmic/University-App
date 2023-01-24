const express = require('express');
const resultController = require('../controllers/resultController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(resultController.findAllResults)
	.post(resultController.createResult);

router
	.route('/:student_id/:exam_id')
	.get(resultController.findResult)
	.put(resultController.updateResult)
	.delete(resultController.deleteResult);

module.exports = router;
