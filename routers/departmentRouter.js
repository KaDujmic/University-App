const express = require('express');
const departmentController = require('../controllers/departmentController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(callbackErrorHandler(departmentController.findAllDepartments))
	.post(callbackErrorHandler(departmentController.createDepartment));

router
	.route('/:id')
	.get(callbackErrorHandler(departmentController.findDepartment))
	.put(callbackErrorHandler(departmentController.updateDepartment))
	.delete(
		callbackErrorHandler(departmentController.deleteDepartment)
	);

router
	.route('/:id/professors')
	.get(
		callbackErrorHandler(departmentController.professorsOnDepartment)
	);

module.exports = router;
