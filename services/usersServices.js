const { User } = require('../models');
const createToken = require('./createToken');

const getAllUsersServ = async () => User.findAll();

const getUserByEmailServ = async (email) => {
  const userEmail = await User.findOne({ where: { email } });
  return userEmail;
};

const userLoginServ = async (userEmail, userPassword) => {
  const user = await getUserByEmailServ(userEmail);

  const { password, ...data } = user;

  if (user && userPassword === password) {
    const token = createToken(data);
    return { token, data };
  }
  throw Error('Login ou senha inválido');
};

module.exports = {
  getAllUsersServ,
  userLoginServ,
};
