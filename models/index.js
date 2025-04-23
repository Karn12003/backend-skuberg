// models/index.js

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://root@localhost:3306/crypto-exchange', {
  dialect: 'mysql',
  logging: false,
});

// User
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Wallet
const Wallet = sequelize.define('Wallet', {
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// Cryptocurrency
const Cryptocurrency = sequelize.define('Cryptocurrency', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  symbol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Transaction
const Transaction = sequelize.define('Transaction', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING, // 'buy', 'sell', 'transfer'
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'pending',
  },
});

// UserCryptocurrency
const UserCryptocurrency = sequelize.define('UserCryptocurrency', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

// === Associations ===

// User <-> Wallet
User.hasMany(Wallet, { foreignKey: 'userId' });
Wallet.belongsTo(User, { foreignKey: 'userId' });

// User <-> Transaction
User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

// Cryptocurrency <-> Transaction
Cryptocurrency.hasMany(Transaction, { foreignKey: 'cryptocurrencyId' });
Transaction.belongsTo(Cryptocurrency, { foreignKey: 'cryptocurrencyId' });

// User <-> UserCryptocurrency <-> Cryptocurrency
User.hasMany(UserCryptocurrency, { foreignKey: 'userId' });
UserCryptocurrency.belongsTo(User, { foreignKey: 'userId' });

Cryptocurrency.hasMany(UserCryptocurrency, { foreignKey: 'cryptocurrencyId' });
UserCryptocurrency.belongsTo(Cryptocurrency, {
  foreignKey: 'cryptocurrencyId',
});

module.exports = {
  sequelize,
  User,
  Wallet,
  Cryptocurrency,
  Transaction,
  UserCryptocurrency,
};
