const Category = require('../models/category');
const Product = require('../models/product');
const ITEMS_PER_PAGE = require('../utils/variables').ITEMS_PER_PAGE;

// Returns all categories(list)
exports.getAllCategories = async (req, res, next) => {
  const result = await Category.find();
  res.send(result);
};
// Returns category
exports.getCategory = async (req, res, next) => {
  const category = { category: req.params.categoryName };
  const page = req.query.page;
  const productsCount = await Product.find(category).countDocuments();
  const lastPage = Math.ceil(productsCount / ITEMS_PER_PAGE);
  const products = await Product.find(category)
    .skip((page - 1) * ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE);
  await res.status(200).send({ products, lastPage });
  next();
};
// Adds category to db
exports.addCategory = async (req, res, next) => {
  await new Category({
    name: req.body.name
  }).save();
  res.status(200).send();
  next();
};
// Deletes category from db
exports.deleteCategory = async (req, res, next) => {
  const deletedCategory = await Category.deleteOne({ name: req.body.name });
  deletedCategory.n
    ? res.status(200).send('Category deleted')
    : res.status(204).send('Category was not deleted');
  next();
};
