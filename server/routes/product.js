const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

// GET /product - returns all products
router.get('/', productController.getProducts);

// POST /product - adds product to db
router.post('/', productController.addProduct);

// DELETE /product - deletes product from db
router.delete('/', productController.deleteProduct);

module.exports = router;
