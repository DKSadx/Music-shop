const { body } = require('express-validator');

const User = require('../models/user');

exports.validateSignup = () => [
  body('username')
    .exists()
    .isAlphanumeric()
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
    .isAlphanumeric()
    .withMessage('Username can only container numbers and letters.')
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

exports.validateUsername = () => [
  body('newUsername')
    .exists()
    .isAlphanumeric()
    .withMessage('Username can only contain numbers and letters.')
    .custom(username => {
      return User.findOne({ username }).then(user => {
        if (user) {
          throw new Error('Username already exists.');
        }
      });
    })
];

exports.validateEmail = () => [
  body('newEmail')
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
    })
];

exports.validatePassword = () => [
  body('newPassword')
    .exists()
    .isLength({ min: 6 })
    .withMessage('Password too short!')
    .custom((newPassword, { req }) => {
      return User.findOne({ _id: req.userId }).then(user => {
        if (user.password !== req.body.oldPassword) {
          throw new Error('Old password is wrong!');
        }
      });
    })
];
