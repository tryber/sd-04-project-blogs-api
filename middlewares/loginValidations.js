const { Users } = require('../models');

const createMessageJSON = (message) => ({ message });

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json(createMessageJSON('"email" is not allowed to be empty'));
  }

  if (!email) {
    return res.status(400).json(createMessageJSON('"email" is required'));
  }

  return next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json(createMessageJSON('"password" is not allowed to be empty'));
  }

  if (!password) {
    return res.status(400).json(createMessageJSON('"password" is required'));
  }

  return next();
};

const validateCredentials = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  req.user = user.dataValues;
  return next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateCredentials,
};
