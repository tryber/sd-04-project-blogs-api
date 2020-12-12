const { User } = require('../models');

const buildResponse = (message) => {
  const resp = { message };
  return resp;
};

const verifyDisplayName = async (req, res, next) => {
  const { displayName } = req.body;

  if (displayName.length < 8) {
    return res
      .status(400)
      .json(buildResponse('"displayName" length must be at least 8 characters long'));
  }

  return next();
};

const verifyEmail = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json(buildResponse('"email" is required'));
  }

  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json(buildResponse('"email" must be a valid email'));
  }

  return next();
};

const verifyPassword = async (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json(buildResponse('"password" is required'));
  }

  if (password.length < 6) {
    return res.status(400).json(buildResponse('"password" length must be 6 characters long'));
  }

  return next();
};

const verifyUserExistence = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).json(buildResponse('Usuário já existe'));
  }

  return next();
};

module.exports = {
  verifyDisplayName,
  verifyEmail,
  verifyPassword,
  verifyUserExistence,
};
