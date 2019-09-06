const express = require('express');

const authController = require('../controllers/auth');
const isValid = require('../middleware/isValid');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// GET auth/isAuth, returns if users jwt token is valid
router.get('/isauth', isAuth, authController.isAuth);

// GET auth/isAdmin, returns if user is admin
router.get('/isadmin', isAuth, isAdmin, authController.isAdmin);

// POST auth/signup
router.post('/signup', isValid.validateSignup(), authController.signup);

// POST auth/signin
router.post('/signin', isValid.validateSignin(), authController.signin);

module.exports = router;
