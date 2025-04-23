const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crypto-exchange', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
