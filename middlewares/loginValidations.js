const { Users } = require('../models');

const createMessage = (message) => ({ message });

const verifyEmail = (req, res, next) => {
  const { email } = req.body;

  if (email === '') {
    return res.status(400).json(createMessage('"email" is not allowed to be empty'));
  }

  if (!email) {
    return res.status(400).json(createMessage('"email" is required'));
  }

  return next();
};

const verifyPassword = (req, res, next) => {
  const { password } = req.body;

  if (password === '') {
    return res.status(400).json(createMessage('"password" is not allowed to be empty'));
  }

  if (!password) {
    return res.status(400).json(createMessage('"password" is required'));
  }

  return next();
};

const verifyUserExists = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const { id, displayName, image } = user.dataValues;
  req.user = { email, id, displayName, image };
  return next();
};

module.exports = {
  verifyEmail,
  verifyPassword,
  verifyUserExists,
};
