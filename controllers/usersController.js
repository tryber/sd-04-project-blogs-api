const rescue = require('express-rescue');
const { User } = require('../models');
const { usersServices } = require('../services');

const getAllUsersCont = rescue(async (_req, res) => {
  const allUsers = await usersServices.getAllUsersServ();

  return res.status(200).json(allUsers);
});

const loginUserCont = rescue(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findAll({ where: { email } });

  if (user.length <= 0) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const { token } = await usersServices.userLoginServ(email, password);

  return res.status(200).json({ token });
});

const createUserCont = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.findAll({ where: { email } });

  if (user.length > 0) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  const newUser = await usersServices.createUserServ({ displayName, email, password, image });

  return res.status(201).json(newUser);
});

const getUserByIdCont = rescue(async (req, res) => {
  const { id } = req.params;
  const userId = await usersServices.getUserByIdServ(id);
  if (userId.length <= 0) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(userId[0]);
});

const deleteUserByIdCont = rescue(async (req, res) => {
  const { id } = req.user;
  await usersServices.deleteUserByIdServ(id);

  return res.status(204).end();
});

module.exports = {
  getAllUsersCont,
  loginUserCont,
  createUserCont,
  getUserByIdCont,
  deleteUserByIdCont,
};
