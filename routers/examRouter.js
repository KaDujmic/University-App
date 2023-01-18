const express = require('express');
const examController = require('../controllers/examController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(examController.findAllExams)
	.post(examController.createExam);

router
	.route('/:id')
	.get(examController.findExam)
	.put(examController.updateExam)
	.delete(examController.deleteExam);


module.exports = router;
