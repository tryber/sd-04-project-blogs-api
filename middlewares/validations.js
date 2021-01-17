const { User } = require('../models');

const displayNameValidator = (req, res, next) => {
  const { displayName } = req.body;

  if (!displayName || displayName.length < 8) {
    return res.status(400).send({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  next();
};

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  const regex = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;

  if (!email) {
    return res.status(400).send({ message: '"email" is required' });
  }
  if (!regex.test(email)) {
    return res.status(400).send({ message: '"email" must be a valid email' });
  }

  next();
};

const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).send({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return res.status(400).send({ message: '"password" length must be at least 6 characters long' });
  }
  next();
};

const uniqueEmailValidator = async (req, res, next) => {
  const email = await User.findOne({ where: { email: req.body.email } });
  if (email) {
    return res.status(409).send({ message: 'Usuário já existe' });
  }

  next();
};

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') {
    return res.status(400).send({ message: '"email" is not allowed to be empty' });
  }
  if (password === '') {
    return res.status(400).send({ message: '"password" is not allowed to be empty' });
  }

  next();
};

const postValidator = (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return res.status(400).send({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(400).send({ message: '"content" is required' });
  }

  next();
};

const authorValidator = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ where: { email } });
  const { id } = req.params;
  const post = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(400).send({ message: '"content" is required' });
  }
  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(401).send({ message: 'Usuário não autorizado' });
  }
  req.user = { ...req.user, userId: user.dataValues.id };

  next();
};

module.exports = {
  displayNameValidator,
  emailValidator,
  passwordValidator,
  uniqueEmailValidator,
  loginValidator,
  postValidator,
  authorValidator,
};
