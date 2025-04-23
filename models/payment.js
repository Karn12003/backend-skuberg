module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    payment_method: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
  });

  Payment.associate = (models) => {
    Payment.belongsTo(models.Transaction, { foreignKey: 'transaction_id' });
    Payment.belongsTo(models.Order, { foreignKey: 'order_id' });
  };

  return Payment;
};
