const { User } = require('../models');

const validateDisplayName = (displayName) => displayName.length >= 8;

const validateEmail = (email) => {
  const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return emailRegex.test(email);
};

const validatePassword = (password) => password.length >= 6;

const emailExists = async (email) => User.findOne({ where: { email } });

const userExists = async (email, password) => {
  const user = await User.findOne({ where: { email, password } });
  return user;
};

const validateUser = (displayName, email, password) => {
  if (!validateDisplayName(displayName)) {
    return { message: '"displayName" length must be at least 8 characters long' };
  }

  if (!email) return { message: '"email" is required' };

  if (!password) return { message: '"password" is required' };

  if (!validateEmail(email)) return { message: '"email" must be a valid email' };

  if (!validatePassword(password)) return { message: '"password" length must be 6 characters long' };
};

const validateLogin = (email, password) => {
  if (email === undefined) return { message: '"email" is required' };

  if (!email) return { message: '"email" is not allowed to be empty' };

  if (password === undefined) return { message: '"password" is required' };

  if (!password) return { message: '"password" is not allowed to be empty' };
};

module.exports = {
  validateUser,
  validateLogin,
  emailExists,
  userExists,
};
