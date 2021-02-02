'use strict'

var express = require('express');
var UserController = require('../controllers/user');
const { verifyToken } = require('../middleware/auth');
const { authUser } = require('../middleware/auth');
const { authRole } = require('../middleware/auth');


var router = express.Router();

router.get('/users', verifyToken, authRole(["ADMIN"]), UserController.getAllUsers);
router.get('/user/:id?', verifyToken, authUser, UserController.getUser);
router.post('/user', verifyToken, authRole(["ADMIN"]), UserController.createUser);
router.put('/user/:id', verifyToken, authUser, UserController.updateUser);
router.delete('/user/:id', verifyToken, authRole(["ADMIN"]), UserController.deleteUser);

module.exports = router;