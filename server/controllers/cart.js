const User = require('../models/user');
const Product = require('../models/product');

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate('cart');
  res.send({ cart: user.cart });
  next();
};

exports.addToCart = async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.userId;
  const user = { _id: userId };
  const product = { $push: { cart: productId } };
  await User.findOneAndUpdate(user, product, { useFindAndModify: false });
  res.status(200).send();
  next();
};

exports.removeFromCart = async (req, res, next) => {
  const productId = req.body._id;
  const userId = req.userId;
  const user = { _id: userId };
  const product = { $pull: { cart: productId } };
  const cart = await User.findOneAndUpdate(user, product, { useFindAndModify: false, new: true }).populate('cart');
  res.send(cart);
  next();
};
