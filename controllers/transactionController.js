const { Transaction, User, Cryptocurrency } = require('../models');
exports.createTransaction = async (req, res) => {
  const { user_id, crypto_id, amount, status } = req.body;
  const transaction = await Transaction.create({
    user_id,
    crypto_id,
    amount,
    status,
    timestamp: new Date(),
  });
  res.json(transaction);
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.findAll({
    include: [User, Cryptocurrency],
  });
  res.json(transactions);
};
