const express = require('express');
const enrollmentController = require('../controllers/enrollmentController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(enrollmentController.findAllEnrollments)
	.post(enrollmentController.createEnrollment);

router
	.route('/:studentId/:courseId')
	.get(enrollmentController.findEnrollment)
	.put(enrollmentController.updateEnrollment)
	.delete(enrollmentController.deleteEnrollment);


module.exports = router;
