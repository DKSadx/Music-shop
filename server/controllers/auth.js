const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  let errorMessages = {
    username: '',
    email: '',
    password: ''
  };
  // Sends errors if they exist else it creates new user
  if (!validationResult(req).isEmpty()) {
    validationResult(req).errors.map(error => {
      errorMessages = { ...errorMessages, [error.param]: error.msg };
    });
    res.status(200).send({ errorMessages });
  } else {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cart: []
    });
    user.save();

    res.status(200).send({ isSuccessful: true });
  }
  next();
};

exports.signin = (req, res, next) => {
  const { username } = req.body;
  const errorMessage = 'You have entered an invalid username or password.';
  if (!validationResult(req).isEmpty()) {
    res.status(203).send({ errorMessage });
  } else {
    User.findOne({ username })
      .then(user => {
        if (user && user.password === req.body.password) {
          const token = jwt.sign(
            {
              userId: user._id.toString(),
              username: user.username
            },
            'yxnPAu3Prq93LtiFYVQk9',
            {
              expiresIn: '1h'
            }
          );
          res.status(200).json({ token, userId: user._id.toString() });
        } else {
          res.status(203).send({ errorMessage });
        }
      })
      .catch(err => console.log(err));
  }
};
exports.isAuth = (req, res, next) => {
  if (req.isAuth) {
    res.send({ isAuth: true });
  }
};
