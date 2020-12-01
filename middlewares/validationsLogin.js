const { Users } = require('../models');

//  Validações referentes ao Email --------------------------------------------
const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (!email) {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  return next();
};

//  Validações referentes a Senha ---------------------------------------------
const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (!password) {
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }

  return next();
};

//  Validação para verificar se o usuário já existe ---------------------------
const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  return next();
};

module.exports = { validateEmail, validatePassword, validateUser };
