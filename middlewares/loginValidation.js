const { Users } = require('../models');

const checkEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (!email) {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }

  return next();
};

const checkPassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }

  return next();
};

const checkUserExists = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json({ message: 'User already exists' });
  }

  return next();
};

module.exports = { checkEmail, checkPassword, checkUserExists };
