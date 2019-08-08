const Category = require('../models/category');
const Product = require('../models/product');

// Returns all categories(list)
exports.getAllCategories = async (req, res, next) => {
  const result = await Category.find();
  res.send(result);
};
// Returns category
exports.getCategory = async (req, res, next) => {
  const name = req.params.categoryName;
  const category = await Category.find({ name }).populate('products', '-category');
  await res.status(200).send(category);
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
  deletedCategory.n ? res.status(200).send('Category deleted') : res.status(204).send('Category was not deleted');
  next();
};
