const { validationResult } = require('express-validator');

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
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save();
    res.status(200).send();
  }
  next();
};
