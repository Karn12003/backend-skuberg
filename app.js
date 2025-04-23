const express = require('express');

const app = express();

app.use(express.json());

const {
  sequelize,
  User,
  Wallet,
  Cryptocurrency,
  Transaction,
  UserCryptocurrency,
} = require('./models');

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.error('Unable to sync database:', err);
  });

app.use(express.json());

// API สำหรับสร้างผู้ใช้งาน
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await User.create({ username, email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับดึงข้อมูลผู้ใช้งานทั้งหมด
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับดึงข้อมูลผู้ใช้งานตาม ID
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับอัพเดตข้อมูลผู้ใช้งาน
app.put('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const { username, email, password } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับลบผู้ใช้งาน
app.delete('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับสร้าง Wallet
app.post('/api/wallets', async (req, res) => {
  try {
    const { userId, balance } = req.body;
    const wallet = await Wallet.create({ userId, balance });
    res.status(201).json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับดึงข้อมูล Wallet ตาม userId
app.get('/api/wallets/:userId', async (req, res) => {
  try {
    const wallet = await Wallet.findOne({
      where: { userId: req.params.userId },
    });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    res.status(200).json(wallet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับสร้าง Cryptocurrency
app.post('/api/cryptocurrencies', async (req, res) => {
  try {
    const { name, symbol } = req.body;
    const crypto = await Cryptocurrency.create({ name, symbol });
    res.status(201).json(crypto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับสร้าง Transaction
app.post('/api/transactions', async (req, res) => {
  try {
    const { userId, cryptocurrencyId, amount, type, status } = req.body;
    const transaction = await Transaction.create({
      userId,
      cryptocurrencyId,
      amount,
      type,
      status,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับซื้อ Cryptocurrency
app.post('/api/cryptocurrencies/buy', async (req, res) => {
  try {
    const { userId, cryptocurrencyId, amount, fiatCurrency, paymentMethod } =
      req.body;

    // ตรวจสอบว่าผู้ใช้งานมี Wallet เพียงพอหรือไม่
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet || wallet.balance < amount) {
      return res.status(400).json({ error: 'Insufficient funds in wallet' });
    }

    // ลดยอดเงินใน Wallet ของผู้ใช้งาน
    wallet.balance -= amount;
    await wallet.save();

    // สร้าง Transaction ใหม่
    const transaction = await Transaction.create({
      userId,
      cryptocurrencyId,
      amount,
      type: 'BUY',
      status: 'COMPLETED',
      fiatCurrency,
      paymentMethod,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// API สำหรับขาย Cryptocurrency
app.post('/api/cryptocurrencies/sell', async (req, res) => {
  try {
    const { userId, cryptocurrencyId, amount, fiatCurrency, paymentMethod } =
      req.body;

    // ตรวจสอบว่าผู้ใช้งานมี Cryptocurrency เพียงพอหรือไม่
    const userCryptocurrency = await UserCryptocurrency.findOne({
      where: { userId, cryptocurrencyId },
    });
    if (!userCryptocurrency || userCryptocurrency.amount < amount) {
      return res
        .status(400)
        .json({ error: 'Insufficient cryptocurrency balance' });
    }

    // ลดยอด Cryptocurrency ของผู้ใช้งาน
    userCryptocurrency.amount -= amount;
    await userCryptocurrency.save();

    // เพิ่มยอดเงินใน Wallet ของผู้ใช้งาน
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }
    wallet.balance += amount * userCryptocurrency.price; // สมมติว่า userCryptocurrency มีราคา
    await wallet.save();

    // สร้าง Transaction ใหม่
    const transaction = await Transaction.create({
      userId,
      cryptocurrencyId,
      amount,
      type: 'SELL',
      status: 'COMPLETED',
      fiatCurrency,
      paymentMethod,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// รัน server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
