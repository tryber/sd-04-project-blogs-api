const { Users, Posts } = require('../models');

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
  const mailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  const testEmailRegex = mailRegex.test(email);

  if (!email) {
    return res.status(400).send({ message: '"email" is required' });
  }
  if (!testEmailRegex) {
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
    return res.status(400).send({ message: '"password" length must be 6 characters long' });
  }

  next();
};

const loginValidator = async (req, res, next) => {
  const { email, password } = req.body;
  if (email === '') {
    return res.status(400).send({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(400).send({ message: '"email" is required' });
  }

  if (password === '') {
    return res.status(400).send({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(400).send({ message: '"password" is required' });
  }

  next();
};

const uniqueEmailValidator = async (req, res, next) => {
  const email = await Users.findOne({ where: { email: req.body.email } });
  if (email) {
    return res.status(409).send({ message: 'Usuário já existe' });
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
  const user = await Users.findOne({ where: { email } });
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id } });

  if (!post) {
    return res.status(404).send({ message: 'Post não existe' });
  }
  if (!user) {
    return res.status(400).send({ message: '"content" is required' });
  }
  if (user.id !== post.userId) {
    return res.status(401).send({ message: 'Usuário não autorizado' });
  }
  req.user = { ...req.user, userId: user.id };

  next();
};

module.exports = {
  displayNameValidator,
  emailValidator,
  passwordValidator,
  loginValidator,
  uniqueEmailValidator,
  postValidator,
  authorValidator,
};
