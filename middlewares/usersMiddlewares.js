const { usersController } = require('../controllers');

const verifyEmailLogin = (req, res, next) => {
  const { email } = req.body;
  if (email === "") {
    return res.status(400).send({ message: '"email" is not allowed to be empty' });
  }
  if (!email) {
    return res.status(400).send({ message: '"email" is required' });
  }

  return next();
};

const verifyPasswordLogin = (req, res, next) => {
  const { password } = req.body;
  if (password === "") {
    return res.status(400).send({ message: '"password" is not allowed to be empty' });
  }
  if (!password) {
    return res.status(400).send({ message: '"password" is required' });
  }

  return next();
};

const verifyDisplayNameCreate = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    res.status(400).send({ message: '"displayName" length must be at least 8 characters long' });
  }
  return next();
};

const verifyEmailCreate = async (req, res, next) => {
  console.log(usersController)
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ message: '"email" is required' });
  }
  const user = await usersController.findByEmail(email);
  if (user) {
    res.status(409).send({ message: 'Usuário já existe' });
  }
  const emailRegex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  const testEmailRegex = emailRegex.test(email);
  if (!testEmailRegex) {
    res.status(400).send({ message: '"email" must be a valid email' });
  }

  return next();
};

const verifyPasswordCreate = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.status(400).send({ message: '"password" is required' });
  }
  if (password.toString().length < 6) {
    res.status(400).send({ message: '"password" length must be 6 characters long' });
  }

  return next();
};

module.exports = {
  verifyEmailLogin,
  verifyPasswordLogin,
  verifyDisplayNameCreate,
  verifyEmailCreate,
  verifyPasswordCreate,
};
