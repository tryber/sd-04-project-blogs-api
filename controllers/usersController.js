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

module.exports = {
  getAllUsersCont,
  loginUserCont,
  createUserCont,
};
