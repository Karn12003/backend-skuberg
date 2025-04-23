// models/userCryptocurrency.js
module.exports = (sequelize, DataTypes) => {
  const UserCryptocurrency = sequelize.define('UserCryptocurrency', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cryptocurrencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return UserCryptocurrency;
};
