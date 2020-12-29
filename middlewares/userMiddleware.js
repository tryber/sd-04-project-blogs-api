const User = require('../models');

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const validateName = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName) {
    return res.status(400).json({ message: '"displayName" is required' });
  }

  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  next();
};

const emailExists = async (email) => User.findOne({ where: { email } });

const userExists = async (email, password) => User.findOne({ where: { email, password } });

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  const isEmailValid = email.match(/\S+@\w+\.\w{2,6}(\.\w{2})?/i);

  if (!isEmailValid) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const validateLogin = (email, password) => {
  if (!email) {
    return { message: '"email" is required' };
  }
  if (email === '') {
    return { message: '"email" is not allowed to be empty' };
  }

  if (!password) {
    return { message: '"password" is required' };
  }
  if (password === '') {
    return { message: '"password" is not allowed to be empty' };
  }
};

module.exports = {
  validateEmail,
  validateName,
  validatePassword,
  validateLogin,
  emailExists,
  userExists,
};
