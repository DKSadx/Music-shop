require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');
const Category = require('./models/category');

const app = express();

app.use(bodyParser.json());

// Headers for allowing request, client<->server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// TODO I - 1.fill products, 2.pagination, 3.refactor code, 4.edit product, 5.upload images...
// TODO II - 1.optimize images, 2.auth, 3.cart, 4.validation, 5.webtokens...

// * GET
// Returns all products
app.get('/get-all-products', (req, res) => {
  Product.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => console.log(err));
});
// Returns all category names
app.get('/get-categories', (req, res) => {
  Category.find()
    .then(result => res.send(result))
    .catch(err => console.log(err));
});
// * POST
// Returns specific category with products
app.post('/get-category', async (req, res) => {
  const category = await Category.find({ name: req.body.name }).populate('products', '-category');
  res.status(200).send(category);
});
// Adds new product to Product db and adds it to the corresponding category
app.post('/add-product', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    category: req.body.category
  });
  product.save();
  // Adds Product id to the corresponding category
  const productCategory = { name: req.body.category };
  const productId = { $push: { products: product._id } };
  await Category.findOneAndUpdate(productCategory, productId, { useFindAndModify: false });
  res.status(200).send();
});
// Adds a category
app.post('/add-category', (req, res) => {
  new Category({
    name: req.body.name
  }).save();
  res.status(200).send();
});

// * DELETE
// Deletes a product or all products by name
app.delete('/delete-product-by-name', (req, res) => {
  Product.find({ name: req.body.name })
    .then(async result => {
      // Removes the product from the category list
      await Category.updateOne({ name: result[0].category }, { $pull: { products: result[0]._id } }, { multi: true });
    })
    .catch(err => console.log(err));
  Product.deleteOne({ name: req.body.name })
    .then(isDeleted => {
      // Checks if the number of deleted products !== 0
      isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
    })
    .catch(err => console.log(err));
});
// Deletes a product by _id
app.delete('/delete-product-by-id', (req, res) => {
  Product.find({ _id: req.body.objectId })
    .then(async result => {
      await Category.updateOne({ name: result[0].category }, { $pull: { products: result[0]._id } });
    })
    .catch(err => console.log(err));
  Product.deleteOne({ _id: req.body.objectId })
    .then(isDeleted => {
      // Checks if the number of deleted products !== 0
      isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
    })
    .catch(err => console.log(err));
});
app.delete('/delete-all-products', (req, res) => {
  if (req.body.deleteAll) {
    Product.deleteMany({})
      .then(isDeleted => {
        isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
      })
      .catch(err => console.log(err));
  }
});
// Deletes a category
app.delete('/delete-category', (req, res) => {
  Category.deleteOne({ name: req.body.name })
    .then(isDeleted => {
      isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
    })
    .catch(err => console.log(err));
});
// Deletes all categories
app.delete('/delete-all-categories', (req, res) => {
  if (req.body.deleteAll) {
    Category.deleteMany({})
      .then(isDeleted => {
        isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
      })
      .catch(err => console.log(err));
  }
});

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DATABASE}`, { useNewUrlParser: true })
  .then(result => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));
