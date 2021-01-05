const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const messageError = require('../utils/messageError');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'NinguemNuncaVaiDescobrirEsteTokenSecreto';

const loginEmailValidation = (req, res, next) => {
  const { email } = req.body;

  if (!email.length) {
    return messageError(res, 400, '"email" is not allowed to be empty');
  }
  if (!email) {
    return messageError(res, 400, '"email" is required');
  }
  return next();
};

const loginPassValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password.length) {
    return messageError(res, 400, '"password" is not allowed to be empty');
  }
  if (!password) {
    return messageError(res, 400, '"password" is required');
  }

  return next();
};

const userLoginValidation = (req, res) => {
  const { email, password } = req.body;

  Users.findOne({ where: { email } })
    .then(({ dataValues }) => {
      if (email !== dataValues.email || password !== dataValues.password) {
        return res.status(400).json({ message: 'Campos invalidos' });
      }
      const token = jwt.sign({ data: dataValues }, secret, jwtConfig);
      req.headers.authorization = token;
      res.status(200).json({ token });
    });
};

module.exports = { userLoginValidation, loginEmailValidation, loginPassValidation };
