// seed.js

const {
  sequelize,
  User,
  Cryptocurrency,
  UserCryptocurrency,
  Wallet,
} = require('./models');

async function seed() {
  await sequelize.sync({ force: true });

  // Seed User
  const user = await User.create({
    username: 'testuser',
    email: 'test@example.com',
    password: 'password123',
  });

  // Seed Cryptocurrencies
  const cryptos = await Promise.all([
    Cryptocurrency.create({ name: 'Bitcoin', symbol: 'BTC' }),
    Cryptocurrency.create({ name: 'Ethereum', symbol: 'ETH' }),
    Cryptocurrency.create({ name: 'Ripple', symbol: 'XRP' }),
    Cryptocurrency.create({ name: 'Dogecoin', symbol: 'DOGE' }),
  ]);

  // Seed Wallet
  await Wallet.create({
    userId: user.id,
    balance: 100000, // Fiat balance
  });

  // Seed UserCryptocurrency
  await UserCryptocurrency.create({
    userId: user.id,
    cryptocurrencyId: cryptos[0].id,
    amount: 0.5,
  });

  console.log('Seeding complete!');
  process.exit();
}

seed();
