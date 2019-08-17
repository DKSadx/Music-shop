const User = require('../models/user');

exports.signup = (req, res, next) => {
  // const username = req.body.username;
  // const password = req.body.password;
  // const email = req.body.email;
  // const user = new User({
  //   username,
  //   email,
  //   password
  // });
  // user.save();
  // console.log(username, password, email);
  res.send('test');
  next();
};
