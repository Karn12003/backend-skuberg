const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

router.get('/users', userController.list);
router.post('/users', userController.create);

module.exports = router;
