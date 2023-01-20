const express = require('express');
const professorController = require('../controllers/professorController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.post('/login', authController.userLogin);

module.exports = router;
