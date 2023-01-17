const express = require('express');
const majorController = require('../controllers/majorController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(majorController.findAllMajors)
	.post(majorController.createMajor);

router
	.route('/:id')
	.get(majorController.findMajor)
	.put(majorController.updateMajor)
	.delete(majorController.deleteMajor);

router.route('/:id/students').get(majorController.studentsOnMajor);

module.exports = router;
