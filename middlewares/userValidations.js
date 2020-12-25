const { User } = require('../models');

const ExpRegularMail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const ExpRegularToken = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;

const existingElements = (req, res, next) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  next();
};

const typeOfElements = (req, res, next) => {
  const { displayName, email, password } = req.body;
  if (typeof displayName !== 'string' || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (!ExpRegularMail.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const isThereMail = async (req, res, next) => {
  const { email } = req.body;
  const mailCheck = await User.findOne({ where: { email } });
  if (mailCheck !== null) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  next();
};

const tokenValidation = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (!ExpRegularToken.test(token)) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
  next();
};

module.exports = {
  existingElements,
  typeOfElements,
  isThereMail,
  tokenValidation,
};
