const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    throw new Error('Not authenticated');
  }
  const jwtToken = req.get('Authorization').split(' ')[1];
  jwt.verify(jwtToken, 'yxnPAu3Prq93LtiFYVQk9', (err, decodedToken) => {
    if (err) {
      throw new Error('Invalid token');
    } else {
      req.userId = decodedToken.userId;
      req.isAuth = true;
    }
  });
  next();
};
