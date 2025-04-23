module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    balance: DataTypes.FLOAT,
  });

  Wallet.associate = (models) => {
    Wallet.belongsTo(models.User, { foreignKey: 'user_id' });
    Wallet.belongsTo(models.Cryptocurrency, { foreignKey: 'crypto_id' });
  };

  return Wallet;
};
