const { User } = require('../models');

const displayNameIsValid = (displayName) => displayName.length >= 8;

const emailExist = (email = false) => email;

const emailIsValid = (email) => {
  const re = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/i;

  if (re.test(email)) return true;

  return false;
};

const pwdExist = (pwd = false) => pwd;

const pwdIsValid = (pwd) => pwd.length >= 6;

const userExist = async (email) => {
  const user = await User.findOne({ where: { email } });

  if (user) return true;

  return false;
};

module.exports = async (req, res, next) => {
  const { displayName, email, password: pwd } = req.body;
  console.log(req.body)

  if (!displayNameIsValid(displayName)) {
    return res.status(400).json(
      { message: '"displayName" length must be at least 8 characters long' },
    );
  }

  if (!emailExist(email)) {
    return res.status(400).json(
      { message: '"email" is required' },
    );
  }

  if (!emailIsValid(email)) {
    return res.status(400).json(
      { message: '"email" must be a valid email' },
    );
  }

  if (!pwdExist(pwd)) {
    return res.status(400).json(
      { message: '"password" is required' },
    );
  }

  if (!pwdIsValid(pwd)) {
    return res.status(400).json(
      { message: '"password" length must be 6 characters long' },
    );
  }

  if (await userExist(email)) return res.status(409).json({ message: 'Usuário já existe' });

  next();
};
