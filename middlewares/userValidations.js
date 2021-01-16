const { Users } = require('../models');

const createMessage = (message) => ({ message });

const validateName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res
      .status(400)
      .json(createMessage('"displayName" length must be at least 8 characters long'));
  }

  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(createMessage('"email" is required'));
  }

  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email)) {
    return res.status(400).json(createMessage('"email" must be a valid email'));
  }

  const user = await Users.findOne({ email });

  if (user) {
    return res.status(409).json(createMessage('Usuário já existe'));
  }

  return next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json(createMessage('"password" is required'));
  }

  if (password.length < 6) {
    return res.status(400).json(createMessage('"password" length must be 6 characters long'));
  }

  return next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
