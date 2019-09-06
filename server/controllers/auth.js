const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
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
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      cart: []
    });
    user.save();

    res.status(200).send({ isSuccessful: true });
  }
  next();
};

exports.signin = async (req, res, next) => {
  const { username, password } = req.body;
  const errorMessage = 'You have entered an invalid username or password.';
  if (!validationResult(req).isEmpty()) {
    res.status(203).send({ errorMessage });
  } else {
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        {
          userId: user._id.toString(),
          username: user.username
        },
        'yxnPAu3Prq93LtiFYVQk9',
        {
          expiresIn: '24h'
        }
      );
      res.status(200).json({ token, userId: user._id.toString() });
    } else {
      res.status(203).send({ errorMessage });
    }
  }
};
exports.isAuth = (req, res, next) => {
  if (req.isAuth) {
    res.send({ isAuth: true });
  }
};
