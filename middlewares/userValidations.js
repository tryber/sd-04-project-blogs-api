const { Users } = require('../models');

const createMessageJSON = (message) => ({ message });

const validateName = async (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName) return res.status(400).json(createMessageJSON('"displayName" is required'));

  if (displayName.length < 8) {
    return res
      .status(400)
      .json(createMessageJSON('"displayName" length must be at least 8 characters long'));
  }

  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(createMessageJSON('"email" is required'));
  }

  const regexEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!regexEmail.test(email)) {
    return res.status(400).json(createMessageJSON('"email" must be a valid email'));
  }

  const user = await Users.findOne({ where: { email } });

  if (user) {
    return res.status(409).json(createMessageJSON('Usuário já existe'));
  }

  return next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json(createMessageJSON('"password" is required'));
  }

  if (password.length < 6) {
    return res.status(400).json(createMessageJSON('"password" length must be 6 characters long'));
  }

  return next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
