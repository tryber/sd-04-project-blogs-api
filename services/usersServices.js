const { User } = require('../models');
const createToken = require('./createToken');

const getAllUsersServ = async () => User.findAll();

const getUserByEmailServ = async (email) => {
  const { dataValues } = await User.findOne({ where: { email } });
  return dataValues;
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

const createUserServ = async ({ displayName, email, password, image }) => {
  const createUser = User.create({ displayName, email, password, image });
  return createUser;
};

const getUserByIdServ = async (id) => {
  const userId = User.findAll({ where: { id } });
  return userId;
};

const deleteUserByIdServ = async (id) => {
  User.destroy({ where: { id } });
};

module.exports = {
  getAllUsersServ,
  userLoginServ,
  getUserByEmailServ,
  createUserServ,
  getUserByIdServ,
  deleteUserByIdServ,
};
