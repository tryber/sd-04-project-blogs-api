const { User } = require('../models');

const buildResponse = (message) => {
  const resp = { message };
  return resp;
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  if (email === undefined) {
    return res.status(400).json(buildResponse('"email" is required'));
  }

  if (!email) {
    return res.status(400).json(buildResponse('"email" is not allowed to be empty'));
  }

  return next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;

  if (password === undefined) {
    return res.status(400).json(buildResponse('"password" is required'));
  }

  if (password === '') {
    return res.status(400).json(buildResponse('"password" is not allowed to be empty'));
  }

  return next();
};

const verifyUserExistence = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, password } });
  if (!user) {
    return res.status(400).json(buildResponse('Campos inválidos'));
  }

  return next();
};

module.exports = { verifyEmail, verifyPassword, verifyUserExistence };
