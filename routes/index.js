const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const orderController = require('../controllers/orderController');
const transactionController = require('../controllers/transactionController');

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);

router.post('/orders', orderController.createOrder);
router.get('/orders', orderController.getOrders);

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions', transactionController.getTransactions);

module.exports = router;
