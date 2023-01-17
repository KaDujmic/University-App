const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(courseController.findAllCourses)
	.post(courseController.createCourse);

router
	.route('/:id')
	.get(courseController.findCourse)
	.put(courseController.updateCourse)
	.delete(courseController.deleteCourse);

router.route('/:id/students').get(courseController.studentsOnCourse);
router.route('/:id/professors').get(courseController.professorsOnCourse);

module.exports = router;
