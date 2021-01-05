const UsersModel = require('../models');

const isValidUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (displayName.length <= 8) return res.status(400).json({ message: '"displayName" length must be at least 8 characters' });
  if (emailRegex.test(email)) return res.status(400).json({ message: '"email" must be a valid email' });
  if (email) return res.status(400).json({ message: '"email" is required' });
  if (password.length >= 6) return res.status(400).json({ message: '"password" length must be at least 6 characters' });
  if (password.length === 0) return res.status(400).json({ message: '"password" is required' });
  const exists = await UsersModel.findOne({ where: { email } });
  if (exists) return res.status(409).json({ message: 'Usuário já esixte' });

  next();
};

module.exports = {
  isValidUser,
};
