const { Users } = require('../model');

const response = (message) => {
  const resp = { message };
  return resp;
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json(response('"email" is required'));
  }

  if (!email) {
    return res.status(400).json(response('"email" is not allowed to be empty'));
  }

  return next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json(response('"password" is required'));
  }

  if (password === '') {
    return res.status(400).json(response('"password" is not allowed to be empty'));
  }

  return next();
};

const validateUserExistence = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json(response('Campos inválidos'));
  }

  return next();
};

module.exports = { validateEmail, validatePassword, validateUserExistence };
