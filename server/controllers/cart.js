const User = require('../models/user');
const Product = require('../models/product');

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate('cart');
  res.send({ cart: user.cart });
  next();
};

exports.getCartSize = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate('cart');
  res.send({ cartSize: user.cart.length });
  next();
};

exports.addToCart = async (req, res, next) => {
  const userId = { _id: req.userId };
  const productId = { $push: { cart: req.body.productId } };
  const user = await User.findOneAndUpdate(userId, productId, { useFindAndModify: false, new: true });
  res.send({ cartSize: user.cart.length });
  next();
};

exports.removeFromCart = async (req, res, next) => {
  const userId = { _id: req.userId };
  const productId = { $pull: { cart: req.body._id } };
  // Without 'new: true' findOneAndUpdate() returns the state BEFORE the update
  const cart = await User.findOneAndUpdate(userId, productId, { useFindAndModify: false, new: true }).populate('cart');
  res.send(cart);
  next();
};
