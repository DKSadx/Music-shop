const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const popularMenuSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  },
  { collection: 'popularMenu' }
);

module.exports = mongoose.model('PopularMenu', popularMenuSchema);
