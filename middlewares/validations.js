const { User } = require('../models');
// const Joi = require('joi');

// const nameSchema = Joi.string().min(8).required();

// const validName = (req, res, next) => {
//   if(!nameSchema.validate(req.body.displayName)) {
//     return res.status(400).json({message: 'muleke brabo!'})
//   }
//   next();
// }

const validDisplayName = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validEmail = (req, res, next) => {
  const { email } = req.body;
  const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

  if (!email) {
    return res.status(400).json({ message: '"email" is required' });
  }

  if (!regex.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  next();
};

const validPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ message: '"password" is required' });
  }

  if (password.length < 6) {
    return res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }

  next();
};

const emailIsUnique = async (req, res, next) => {
  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }
  next();
};

const validLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (email === '') {
    return res
      .status(400)
      .json({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res
      .status(400)
      .json({ message: '"password" is not allowed to be empty' });
  }
  next();
};

const isPossibleInsertPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ message: '"title" is required' });
  }

  if (!content) {
    return res.status(400).json({ message: '"content" is required' });
  }

  next();
};

module.exports = {
  validDisplayName,
  validEmail,
  validPassword,
  emailIsUnique,
  validLogin,
  isPossibleInsertPost,
};
