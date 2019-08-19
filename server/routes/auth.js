const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const { validateSignup } = require('../controllers/validate');

const router = express.Router();

// POST auth/signup
router.post('/signup', validateSignup(), authController.signup);

module.exports = router;
