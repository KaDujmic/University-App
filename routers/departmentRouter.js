const express = require('express');
const departmentController = require('../controllers/departmentController');

const router = express.Router({ mergeParams: true });

router
	.route('/')
	.get(departmentController.findAllDepartments)
	.post(departmentController.createDepartment);

router
	.route('/:id')
	.get(departmentController.findDepartment)
	.put(departmentController.updateDepartment)
	.delete(departmentController.deleteDepartment);

router.route('/:id/professors').get(departmentController.professorsOnDepartment);

module.exports = router;
