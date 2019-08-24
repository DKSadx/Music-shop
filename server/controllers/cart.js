const User = require('../models/user');
const Product = require('../models/product');

exports.addToCart = async (req, res, next) => {
  const productId = req.body.productId;
  const userId = req.userId;
  const user = { _id: userId };
  const product = { $push: { cart: productId } };
  await User.findOneAndUpdate(user, product, { useFindAndModify: false });
  console.log(product);
  res.send('works');
  next();
};

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  console.log(user);
};
