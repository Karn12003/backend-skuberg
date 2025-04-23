module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    order_type: DataTypes.STRING,
    price: DataTypes.FLOAT,
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    Order.belongsTo(models.Cryptocurrency, { foreignKey: 'crypto_id' });
    Order.hasMany(models.Payment, { foreignKey: 'order_id' });
  };

  return Order;
};
