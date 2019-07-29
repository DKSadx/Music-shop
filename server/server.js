require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/product');
const Category = require('./models/category');

const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());

// Headers for allowing request, client<->server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// app.use(bodyParser.json());
// app.get('/', (req, res) => res.json(data));

// GET
app.get('/get-products', (req, res) => {
  Product.find()
    .then(ress => res.send(ress))
    .catch(err => console.log(err));
});

app.get('/get-categories', (req, res) => {
  Category.find()
    .then(ress => res.send(ress))
    .catch(err => console.log(err));
});
// POST
app.post('/add-product', (req, res) => {
  new Product({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    imageUrl: req.body.imageUrl
  }).save();
  res.status(200).send();
});

app.post('/add-category', (req, res) => {
  new Category({
    name: req.body.name
  }).save();
  res.status(200).send();
});

// DELETE
app.delete('/delete-product', (req, res) => {
  if (!req.body.deleteAll) {
    Product.deleteOne({ name: req.body.name })
      .then(isDeleted => {
        isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
      })
      .catch(err => console.log(err));
  } else {
    Product.deleteMany({})
      .then(isDeleted => {
        isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
      })
      .catch(err => console.log(err));
  }
});
app.delete('/delete-category', (req, res) => {
  if (!req.body.deleteAll) {
    Category.deleteOne({ name: req.body.name })
      .then(isDeleted => {
        isDeleted.n > 0 ? res.status(200).send() : res.status(204).send();
      })
      .catch(err => console.log(err));
  } else {
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
