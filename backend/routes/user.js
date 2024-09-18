const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

router.get('/user', userController.getAllUser);
router.get('/user/:id', userController.getUserbyid);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.patch('/user/:id/password', userController.updatePassword);
router.patch('/user/:id/details', userController.updateUserDetails);

module.exports = router;
