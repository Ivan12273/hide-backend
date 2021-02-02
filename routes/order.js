'use strict'

var express = require('express');
var OrderController = require('../controllers/order');
const { verifyToken } = require('../middleware/auth');
const { authRole } = require('../middleware/auth');

var router = express.Router();

var allowedRoles = [
  "ADMIN",
  "SALES",
  "STOCKS",
  "DELIVERINGS",
  "PREPARATION"
];

router.post('/order', verifyToken, authRole(["ADMIN", "SALES"]), OrderController.createOrder);
router.get('/orders', verifyToken, authRole(allowedRoles), OrderController.getAllOrders);
router.get('/order/:id', verifyToken, authRole(allowedRoles), OrderController.getOrder);
router.put('/order/:id', verifyToken, authRole(allowedRoles), OrderController.updateOrder);
router.delete('/order/:id', verifyToken, authRole(["ADMIN", "SALES"]), OrderController.deleteOrder);

//Historial
router.get('/order-history', OrderController.getHistoryOrders);
router.get('/order-history-pdf', OrderController.getHistoryOrdersPDF);
// router.get('/order-history', verifyToken, authRole(allowedRoles), OrderController.getHistoryOrders);

module.exports = router;