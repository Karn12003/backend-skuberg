module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    amount: DataTypes.FLOAT,
    timestamp: DataTypes.DATE,
    status: DataTypes.STRING,
  });

  Transaction.associate = (models) => {
    Transaction.belongsTo(models.User, { foreignKey: 'user_id' });
    Transaction.belongsTo(models.Cryptocurrency, { foreignKey: 'crypto_id' });
    Transaction.hasOne(models.Payment, { foreignKey: 'transaction_id' });
  };

  return Transaction;
};
