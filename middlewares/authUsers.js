const UsersModel = require('../models');

const isValidUser = async (req, res, next) => {
  const { displayName, email, password } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (displayName.length <= 8) res.status(400).json({ message: 'displayName length must be at least 8 characters' });
  if (emailRegex.test(email)) res.status(400).json({ message: 'email must be a valid email' });
  if (email) res.status(400).json({ message: 'email is required' });
  if (password.length >= 6) res.status(400).json({ message: 'password length must be at least 6 characters' });
  const exists = await UsersModel.findOne({ where: { email } });
  if (exists) res.status(409).jason({ message: 'Usuário já esixte' });

  next();
};

module.exports = {
  isValidUser,
};
