const express = require('express');
const productController = require('../controllers/product');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// GET /product/getPopularMenu - returns popular menu
router.get('/getPopularMenu', productController.getPopularMenu);

// GET /product/ - returns all products
router.get('/', productController.getAllProducts);

// GET /product/:id - returns product by id
router.get('/:id', productController.getProduct);

// POST /product/ - adds product to db
router.post('/', isAuth, isAdmin, productController.addProduct);

// POST /product/delete - deletes product from db
router.post('/delete', isAuth, isAdmin, productController.deleteProduct);

module.exports = router;
