app.post('/api/cryptocurrencies/sell', async (req, res) => {
  try {
    const { userId, cryptocurrencyId, amount } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const cryptocurrency = await Cryptocurrency.findByPk(cryptocurrencyId);
    if (!cryptocurrency) {
      return res.status(404).json({ error: 'Cryptocurrency not found' });
    }

    const userCrypto = await UserCryptocurrency.findOne({
      where: {
        userId,
        cryptocurrencyId,
      },
    });

    if (!userCrypto || userCrypto.amount < amount) {
      return res
        .status(400)
        .json({ error: 'Insufficient cryptocurrency balance' });
    }

    const transaction = await Transaction.create({
      userId,
      cryptocurrencyId,
      amount,
      type: 'sell',
      status: 'pending',
    });

    userCrypto.amount -= amount;
    await userCrypto.save();

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
