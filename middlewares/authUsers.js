const { Users } = require('../models');

const isValidUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;
  if (displayName.length < 8) return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!emailRegex.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length < 6) return res.status(400).json({ message: '"password" length must be 6 characters long' });

  const exists = await Users.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Usuário já existe' });

  next();
};

module.exports = {
  isValidUser,
};
