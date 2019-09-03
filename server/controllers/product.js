const Category = require('../models/category');
const Product = require('../models/product');
const ITEMS_PER_PAGE = require('../variables').ITEMS_PER_PAGE;

// Returns all products
exports.getAllProducts = async (req, res, next) => {
  const page = req.query.page;
  const productsCount = await Product.find().countDocuments();
  const lastPage = Math.ceil(productsCount / ITEMS_PER_PAGE);
  const products = await Product.find()
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  res.send({
    products,
    page,
    lastPage
  });
  next();
};
// Returns single product
exports.getProduct = async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.send({
    product
  });
  next();
};

// Adds product to db and adds it to the corresponding category
exports.addProduct = async (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  });
  product.save();
  const productCategory = { name: req.body.category };
  const productId = { $push: { products: product._id } };
  await Category.findOneAndUpdate(productCategory, productId, { useFindAndModify: false });
  res.status(200).send();
  next();
};
// Deletes product from db
exports.deleteProduct = async (req, res, next) => {
  let product;
  // Checks if product is deleted by id or by name
  if (req.body.objectId) {
    product = await Product.find({ _id: req.body.objectId });
  } else {
    product = await Product.find({ name: req.body.name });
  }
  await Category.updateOne({ name: product[0].category }, { $pull: { products: product[0]._id } });
  const isDeleted = await Product.deleteOne({ _id: product[0]._id });
  // Checks if the number of deleted products !== 0
  isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
  next();
};
