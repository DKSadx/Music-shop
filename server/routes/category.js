const express = require('express');
const categoryController = require('../controllers/category');

const router = express.Router();

// GET /category
router.get('/', categoryController.getAllCategories);
// GET /category/:categoryName
router.get('/:categoryName', categoryController.getCategory);

// POST  /category
router.post('/', categoryController.addCategory);

// DELETE /category
router.delete('/delete', categoryController.deleteCategory);

module.exports = router;
