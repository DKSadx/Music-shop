const express = require('express');
const productController = require('../controllers/product');

const router = express.Router();

// GET /product/getPopularMenu - returns popular menu
router.get('/getPopularMenu', productController.getPopularMenu);

// GET /product/ - returns all products
router.get('/', productController.getAllProducts);

// GET /product/:id - returns product by id
router.get('/:id', productController.getProduct);

// POST /product/ - adds product to db
router.post('/', productController.addProduct);

// DELETE /product/ - deletes product from db
router.delete('/', productController.deleteProduct);

module.exports = router;
