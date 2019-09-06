const User = require('../models/user');
module.exports = async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.username === 'admin') {
    req.isAdmin = true;
    next();
  } else {
    throw new Error('Not authorized');
  }
};
