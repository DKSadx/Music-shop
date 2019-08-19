const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const jwtToken = req.get('Authorization').split(' ')[1];
  // todo
  console.log(jwtToken);
  next();
};
