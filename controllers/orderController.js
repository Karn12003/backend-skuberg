const { Order, User, Cryptocurrency } = require('../models');
exports.createOrder = async (req, res) => {
  const { user_id, crypto_id, order_type, price } = req.body;
  const order = await Order.create({ user_id, crypto_id, order_type, price });
  res.json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.findAll({ include: [User, Cryptocurrency] });
  res.json(orders);
};
