const express = require('express');
const categoryController = require('../controllers/category');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

// GET /category
router.get('/', categoryController.getAllCategories);

// GET /category/:categoryName
router.get('/:categoryName', categoryController.getCategory);

// POST  /category
router.post('/', isAuth, isAdmin, categoryController.addCategory);

// POST /category/delete
router.post('/delete', isAuth, isAdmin, categoryController.deleteCategory);

module.exports = router;
