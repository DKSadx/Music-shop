const { body, check } = require('express-validator');

const User = require('../models/user');

exports.validateSignup = () => [
  body('username')
    .exists()
    .custom(username => {
      return User.findOne({ username }).then(user => {
        if (user) {
          throw new Error('Username already exists.');
        }
      });
    }),
  body('email')
    .exists()
    .isEmail()
    .withMessage('Invalid email!')
    .normalizeEmail()
    .custom(email => {
      return User.findOne({ email }).then(user => {
        if (user) {
          throw new Error('Email already exists.');
        }
      });
    }),
  body('password')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password too short!')
];

exports.validateSignin = () => [
  body('username')
    .exists()
    .custom(username => {
      return User.findOne({ username }).then(user => {
        if (!user) {
          throw new Error('Invalid value');
        }
      });
    }),
  body('password')
    .exists()
    .isLength({ min: 6 })
];
