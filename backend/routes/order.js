const express = require('express');
const router = express.Router();
const OrderController = require('../controller/order');

router.post('/order', OrderController.createOrder);
router.get('/order/user/:user_id', OrderController.getOrdersByUserId);
router.get('/orders', OrderController.getAllOrders);
router.delete('/order/:order_id', OrderController.deleteOrder);

module.exports = router;
