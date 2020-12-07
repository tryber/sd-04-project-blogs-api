const { userService: { createUser, loginUser, getUsers } } = require('../services');
const { User } = require('../models');

const createUserController = async ({ body }, res) => {
  try {
    const newUser = await createUser(body);

    if (newUser.message) return res.status(409).json(newUser);

    return res.status(201).json(newUser);
  } catch (_err) {
    return res.status(500).json({ message: 'Unknow error' });
  }
};

const loginUserController = async ({ body }, res) => {
  try {
    const user = await loginUser(body);

    console.log(user);

    if (user.message) return res.status(400).json(user);

    return res.status(200).json(user);
  } catch (_err) {
    return res.status(500).json({ message: 'Unknow error' });
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (_err) {
    return res.status(500).json({ message: 'unknow error' });
  }
};

module.exports = {
  createUserController,
  loginUserController,
  getUsersController,
};
