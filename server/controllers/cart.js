const User = require('../models/user');

exports.getCart = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId).populate('cart.product');
  res.send({ cart: user.cart });
  next();
};

exports.getCartSize = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);
  res.send({ cartSize: user.cart.length });
  next();
};

exports.addToCart = async (req, res, next) => {
  let product;
  let index = -1;
  const userId = { _id: req.userId };
  // Finds user and maps through the cart, if the product exists it returns the index of the product
  const user = await User.findOne(userId);
  user.cart.map((obj, i) => {
    if (req.body.productId == obj.product) index = i;
  });
  // If the products exists(index !== -1), increments quantity
  if (index >= 0) {
    product = { $set: { [`cart.${index}.quantity`]: ++user.cart[index].quantity } };
    // Else pushes the product and sets quantity to 1
  } else {
    product = { $push: { cart: { product: req.body.productId, quantity: 1 } } };
  }
  const updatedUser = await User.findOneAndUpdate(userId, product, { useFindAndModify: false, new: true });
  res.send({ cartSize: updatedUser.cart.length });
  next();
};

exports.removeFromCart = async (req, res, next) => {
  // Workaround for removing by index with mongodb
  // 1. Setting the chosen element to null 2. Removing all elements that have null value
  // Ref: https://stackoverflow.com/questions/4588303/in-mongodb-how-do-you-remove-an-array-element-by-its-index/4588909#4588909
  let index;
  const userId = { _id: req.userId };
  const user = await User.findOne(userId);
  // Finding the position(index) in the cart array
  user.cart.map((obj, i) => {
    if (req.body.productId == obj.product) index = i;
  });
  const productSet = { $set: { [`cart.${index}`]: null } };
  const productPull = { $pull: { cart: null } };
  // Without 'new: true' findOneAndUpdate() returns the state BEFORE the update
  await User.findOneAndUpdate(userId, productSet, { useFindAndModify: false, new: true });
  const updatedUser = await User.findOneAndUpdate(userId, productPull, { useFindAndModify: false, new: true }).populate('cart.product');
  res.send({ cart: updatedUser.cart });
  next();
};

exports.changeQuantity = async (req, res, next) => {
  let index = -1;
  const userId = { _id: req.userId };
  // Finds user, maps through the users cart and returns the index of the product
  const user = await User.findOne(userId);
  user.cart.map((obj, i) => {
    if (req.body.productId == obj.product) index = i;
  });
  // Changes quantity, req.body.value can be -1 or 1
  if (req.body.value < 0 && user.cart[index].quantity < 2) {
    res.send();
  } else {
    const product = { $set: { [`cart.${index}.quantity`]: user.cart[index].quantity + req.body.value } };
    const updatedUser = await User.findOneAndUpdate(userId, product, { useFindAndModify: false, new: true }).populate('cart.product');
    res.send({ cart: updatedUser.cart });
  }
  next();
};
