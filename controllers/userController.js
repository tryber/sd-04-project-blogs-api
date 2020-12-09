const { userService: { createUser, loginUser } } = require('../services');
const { User } = require('../models');

const createUserController = async ({ body }, res) => {
  try {
    const newUser = await createUser(body);

    if (newUser.message) return res.status(409).json(newUser);

    return res.status(201).json(newUser);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const loginUserController = async ({ body }, res) => {
  try {
    const user = await loginUser(body);

    if (user.message) return res.status(400).json(user);

    return res.status(200).json(user);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const getAllUsersController = async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const getUserController = async ({ params: { id } }, res) => {
  try {
    const user = await User.findAll({ where: { id } });

    if (user.length === 0) return res.status(404).json({ message: 'Usuário não existe' });

    return res.status(200).json(user[0]);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

const deleteUserController = async ({ user: { email } }, res) => {
  try {
    await User.destroy({ where: { email } });

    return res.status(204).end();
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getAllUsersController,
  getUserController,
  deleteUserController,
};
