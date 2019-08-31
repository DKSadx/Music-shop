const express = require('express');

const accountController = require('../controllers/account');
const isValid = require('../middleware/isValid');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// POST /account/changeUsername
router.post('/changeUsername', isAuth, isValid.validateUsername(), accountController.changeUsername);

// POST /account/changePassword
router.post('/changePassword', isAuth, isValid.validatePassword(), accountController.changePassword);

// POST /account/changeEmail
router.post('/changeEmail', isAuth, isValid.validateEmail(), accountController.changeEmail);

module.exports = router;
