module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      { username: 'alice', email: 'alice@example.com', password: 'password' },
      { username: 'bob', email: 'bob@example.com', password: 'password' },
    ]);

    await queryInterface.bulkInsert('Cryptocurrencies', [
      { name: 'Bitcoin', symbol: 'BTC' },
      { name: 'Ethereum', symbol: 'ETH' },
      { name: 'Ripple', symbol: 'XRP' },
      { name: 'Dogecoin', symbol: 'DOGE' },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Cryptocurrencies', null, {});
  },
};
