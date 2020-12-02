const { Users } = require('../models');

const emailRegex = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

const validateCreateUser = (req, res, next) => {
  const { displayName, email, password } = req.body;

  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  if (!email) {
    res.status(400).json({
      message: '"email" is required',
    });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  if (!password) {
    res.status(400).json({
      message: '"password" is required',
    });
  }

  if (String(password).length < 6) {
    res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

const checkIfEmailExist = async (req, res, next) => {
  const { email } = req.body;
  const emailUser = await Users.findOne({ where: { email } });
  if (emailUser) {
    res.status(409).json({
      message: 'Usuário já existe',
    });
  }
  next();
};

module.exports = { validateCreateUser, checkIfEmailExist };
