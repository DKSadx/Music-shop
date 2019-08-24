const express = require('express');
const cartController = require('../controllers/cart');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// GET /cart/getCart
router.get('/getCart', isAuth, cartController.getCart);

// POST /cart/addToCart
router.post('/addToCart', isAuth, cartController.addToCart);

module.exports = router;
