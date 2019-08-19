const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const isValid = require('../middleware/isValid');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// POST auth/signup
router.post('/signup', isValid.validateSignup(), authController.signup);

// POST auth/signin
router.post('/signin', isValid.validateSignin(), isAuth, authController.signin);

module.exports = router;
