const emailValidator = require('email-validator');

const { Users } = require('../models');

const messageError = (res, status, message) => res.status(status).json({ message });

const userValidation = async (req, res, next) => {
  const user = await Users.findOne({
    where: { email: req.body.email },
  });
  if (user) {
    return messageError(res, 409, 'Usuário já existe');
  }
  return next();
};

const nameValidation = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return messageError(res, 400, '\"displayName\" length must be at least 8 characters long');
  }
  return next();
};

const passValidation = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return messageError(res, 400, '\"password\" is required');
  }
  if (password.length < 6) {
    return messageError(res, 400, '\"password\" length must be 6 characters long');
  }
  return next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return messageError(res, 400, '\"email\" is required');
  }
  if (!emailValidator.validate(email)) {
    return messageError(res, 400, '\"email\" must be a valid email');
  }
  return next();
};

module.exports = {
  userValidation,
  nameValidation,
  passValidation,
  emailValidation,
};
