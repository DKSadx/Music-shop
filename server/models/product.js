const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productShema = new Schema({
  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  imageUrl: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model('Product', productShema);
