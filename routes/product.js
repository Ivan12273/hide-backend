'use strict'

var express = require('express');
var ProductController = require('../controllers/product');
const { verifyToken } = require('../middleware/auth');
const { authRole } = require('../middleware/auth');

var router = express.Router();

router.get('/products', verifyToken, ProductController.getAllProducts);
router.get('/product/:id?', verifyToken, ProductController.getProduct);
router.post('/product', verifyToken, authRole(["ADMIN", "STOCKS"]), ProductController.createProduct);
router.put('/product/:id', verifyToken, authRole(["ADMIN", "STOCKS"]), ProductController.updateProduct);
router.delete('/product/:id', verifyToken, authRole(["ADMIN", "STOCKS"]), ProductController.deleteProduct);

module.exports = router;