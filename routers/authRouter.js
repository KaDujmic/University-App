const express = require('express');
const authController = require('../controllers/authController');
const {
	callbackErrorHandler,
} = require('../utils/errorMiddlewareHandler');

const router = express.Router({ mergeParams: true });

router.post('/login', callbackErrorHandler(authController.userLogin));

module.exports = router;
