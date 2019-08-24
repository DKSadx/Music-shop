const express = require('express');
const { body } = require('express-validator');

const authController = require('../controllers/auth');
const isValid = require('../middleware/isValid');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// GET auth/isAuth, returns if users jwt token is valid
router.get('/isauth', isAuth, authController.isAuth);

// POST auth/signup
router.post('/signup', isValid.validateSignup(), authController.signup);

// POST auth/signin
router.post('/signin', isValid.validateSignin(), authController.signin);

module.exports = router;
