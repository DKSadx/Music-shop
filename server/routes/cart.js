const express = require('express');
const cartController = require('../controllers/cart');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

// GET /cart/getCart
router.get('/getCart', isAuth, cartController.getCart);

// GET /cart/getCartSize
router.get('/getCartSize', isAuth, cartController.getCartSize);

// POST /cart/addToCart
router.post('/addToCart', isAuth, cartController.addToCart);

// POST /cart/changeQuantity
router.post('/changeQuantity', isAuth, cartController.changeQuantity);

// POST /cart/removeFromCart
router.post('/removeFromCart', isAuth, cartController.removeFromCart);

module.exports = router;
