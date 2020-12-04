const rescue = require('express-rescue');
const { User } = require('../models');
const { createToken } = require('../services');

const registerUser = rescue(async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const creatUser = await User.create({
      displayName,
      email,
      password,
      image,
    });
    if (creatUser) {
      const userToken = { displayName, email, image };
      const token = createToken(userToken);
      return res.status(201).json({ token });
    }
  } catch (error) {
    // console.log(e.message);
    return res.status(401).json({ message: 'Algo deu errado.' });
  }
});

const getAllUsers = rescue(async (req, res) => {
  try {
    const allUsers = await User.findAll();
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(401).json({ message: 'Algo deu errado.' });
  }
});

const getUserById = rescue(async (req, res) => {
  try {
    const userId = await User.findOne({ where: { id: req.params.id } });
    if (userId === null) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(userId);
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

const deleteUser = rescue(async (req, res) => {
  try {
    const remove = await User.destroy({ where: { email: req.user.email } });
    return res.status(204).json(remove);
  } catch (error) {
    return res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = {
  registerUser,
  getAllUsers,
  getUserById,
  deleteUser,
};
