const { User } = require('../models');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (email.length < 1) {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }

  return next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 1) {
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }

  return next();
};

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  return next();
};

module.exports = { validateEmail, validatePassword, validateUser };
