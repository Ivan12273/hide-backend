'use strict'

var express = require('express');
var ClientController = require('../controllers/client');
const { verifyToken } = require('../middleware/auth');
const { authRole } = require('../middleware/auth');

var router = express.Router();

var allowedRoles = [
    "ADMIN",
    "SALES",
    "STOCKS",
    "DELIVERINGS"
];

router.post('/client', verifyToken, authRole(allowedRoles), ClientController.createClient);
router.get('/clients', verifyToken, authRole(allowedRoles), ClientController.getAllClients);
router.get('/client/:id?', verifyToken, authRole(allowedRoles), ClientController.getClient);
router.put('/client/:id', verifyToken, authRole(allowedRoles), ClientController.updateClient);
router.delete('/client/:id', verifyToken, authRole(allowedRoles), ClientController.deleteClient);

module.exports = router;