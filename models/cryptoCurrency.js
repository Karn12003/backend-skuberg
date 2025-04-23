module.exports = (sequelize, DataTypes) => {
  const Cryptocurrency = sequelize.define('Cryptocurrency', {
    name: DataTypes.STRING,
    symbol: DataTypes.STRING,
  });

  Cryptocurrency.associate = (models) => {
    Cryptocurrency.hasMany(models.Transaction, { foreignKey: 'crypto_id' });
    Cryptocurrency.hasMany(models.Order, { foreignKey: 'crypto_id' });
  };

  return Cryptocurrency;
};
