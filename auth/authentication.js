const { User } = require('../models');
const Token = require('./token');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('ERR_USER_NOT_FOUND');
  }

  if (String(password) !== String(user.password)) {
    throw new Error('ERR_INVALID_PASSWORD');
  }

  const token = await Token.generate({
    userId: user.id,
    userEmail: user.email,
  });

  return token;
};

module.exports = {
  login,
};
