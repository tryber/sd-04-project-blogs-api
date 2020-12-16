const { User } = require('../models');

const insertNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const user = await User.create({ displayName, email, password, image });
  res.status(201).json({ user });
};

module.exports = { insertNewUser };
