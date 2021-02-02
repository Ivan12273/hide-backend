'use strict'

var express = require('express');
var router = express.Router();
var AuthController = require('../controllers/auth')
const { verifyToken } = require('../middleware/auth');

router.post('/login', AuthController.login);
router.post('/reset-password', AuthController.password_reset);
router.post('/update-password', AuthController.password_update);
router.get('/auth-user', verifyToken, AuthController.auth_user)
// router.post('/logout', AuthController.logout);

module.exports = router;