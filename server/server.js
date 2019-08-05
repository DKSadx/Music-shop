require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');

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

app.use('/category', categoryRoutes);
app.use('/product', productRoutes);

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_DATABASE}`, { useNewUrlParser: true })
  .then(result => {
    app.listen(process.env.PORT || 8080);
  })
  .catch(err => console.log(err));
