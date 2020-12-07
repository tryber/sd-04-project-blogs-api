const { Users } = require('../models');

const displayNameValidation = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length >= 8) return next();

  return res
    .status(400)
    .json({ message: '"displayName" length must be at least 8 characters long' });
};

const isEmailAlreadyRegistered = async (req, res, next) => {
  const { email } = req.body;
  const emailAlreadyRegistered = await Users.findOne({ where: { email } });

  if (!emailAlreadyRegistered) return next();

  return res.status(409).json({ message: 'Usuário já existe' });
};

const isEmailValid = async (req, res, next) => {
  const { email } = req.body;
  const validEmailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (validEmailRegex.test(email)) return next();

  return res.status(400).json({ message: '"email" must be a valid email' });
};

const isEmailEmpty = async (req, res, next) => {
  const { email } = req.body;

  if (email !== '') return next();

  return res.status(400).json({ message: '"email" is not allowed to be empty' });
};

const isEmailRequired = async (req, res, next) => {
  const { email } = req.body;

  if (email) return next();

  return res.status(400).json({ message: '"email" is required' });
};

const passwordLengthValidation = async (req, res, next) => {
  const { password } = req.body;

  if (password.length >= 6) return next();

  return res.status(400).json({ message: '"password" length must be 6 characters long' });
};

const isPasswordEmpty = async (req, res, next) => {
  const { password } = req.body;

  if (password !== '') return next();

  return res.status(400).json({ message: '"password" is not allowed to be empty' });
};

module.exports = {
  displayNameValidation,
  isEmailAlreadyRegistered,
  isEmailValid,
  isEmailEmpty,
  isEmailRequired,
  passwordLengthValidation,
  isPasswordEmpty,
};
