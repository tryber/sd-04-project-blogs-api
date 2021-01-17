const { Users } = require('../model');

const response = (message) => {
  const resp = { message };
  return resp;
};

const validateDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res
      .status(400)
      .json(response('"displayName" length must be at least 8 characters long'));
  }

  return next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(response('"email" is required'));
  }

  const rgx = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i;

  if (!rgx.test(email)) {
    return res.status(400).json(response('"email" must be a valid email'));
  }

  return next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json(response('"password" is required'));
  }

  if (password.length < 6) {
    return res.status(400).json(response('"password" length must be 6 characters long'));
  }

  return next();
};

const validateUserExistence = async (req, res, next) => {
  const { email } = req.body;

  const user = await Users.findOne({ where: { email } });
  if (user) {
    return res.status(409).json(response('Usuário já existe'));
  }

  return next();
};

module.exports = { validateDisplayName, validateEmail, validatePassword, validateUserExistence };
