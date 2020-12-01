const { Users } = require('../models');

//  Validações referentes ao nome do usuário ----------------------------------
const validateName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  return next();
};

//  Validações referentes a senha do usuário ----------------------------------
const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: '"password" length must be 6 characters long' });
  }

  return next();
};

//  Validações referentes ao email do usuário ---------------------------------
const validateEmail = async (req, res, next) => {
  const emailRegex = /\S+@\S+\.\S+/;

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  return next();
};

//  Procura um usuário já existente pelo email --------------------------------
const validadeUser = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  return next();
};

module.exports = {
  validateName,
  validatePassword,
  validateEmail,
  validadeUser,
};
