const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/user', userController.getAllUser);
router.get('/user/:id', userController.getUserbyid);
router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
