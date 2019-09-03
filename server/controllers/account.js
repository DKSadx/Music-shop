const { validationResult } = require('express-validator');
const User = require('../models/user');

exports.changeUsername = async (req, res, next) => {
  // If validator found errors send response with error message
  if (!validationResult(req).isEmpty()) {
    const errorMessage = validationResult(req).errors[0].msg;
    res.send({ errorMessage });
  } else {
    // Else change the username in the database
    const userId = { _id: req.userId };
    const newUsername = { $set: { username: req.body.newUsername } };
    await User.findOneAndUpdate(userId, newUsername, { useFindAndModify: false });
    res.status(200).send();
  }
  next();
};

exports.changePassword = async (req, res, next) => {
  // If validator found errors send response with error message
  if (!validationResult(req).isEmpty()) {
    const errorMessage = validationResult(req).errors[0].msg;
    res.send({ errorMessage });
  } else {
    // Else change the password in the database
    const userId = { _id: req.userId };
    const newPassword = { $set: { password: req.body.newPassword } };
    await User.findOneAndUpdate(userId, newPassword, { useFindAndModify: false });
    res.status(200).send();
  }
  next();
};

exports.changeEmail = async (req, res, next) => {
  // If validator found errors send response with error message
  if (!validationResult(req).isEmpty()) {
    const errorMessage = validationResult(req).errors[0].msg;
    res.send({ errorMessage });
  } else {
    // Else change the email in the database
    const userId = { _id: req.userId };
    const newEmail = { $set: { email: req.body.newEmail } };
    await User.findOneAndUpdate(userId, newEmail, { useFindAndModify: false });
    res.status(200).send();
  }
  next();
};