const { Users } = require('../models');
const { createToken } = require('../service');

const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const emailExistOrNot = await Users.findOne({ where: { email } });

    if (emailExistOrNot) return res.status(409).json({ message: 'Usuário já existe' });

    await Users.create({ displayName, email, password, image });

    const token = createToken({ email, password });

    return res.status(201).json(token);
  } catch (err) {
    console.error('createUser', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailExistOrNot = await Users.findOne({ where: { email } });

    if (!emailExistOrNot) return res.status(400).json({ message: 'Campos inválidos' });

    const token = createToken({ email, password });

    return res.status(200).json({ token });
  } catch (err) {
    console.error('loginUser', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const getAllUsers = async (_req, res) => {
  try {
    const allUsers = await Users.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(allUsers);
  } catch (err) {
    console.error('getAllUsers', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Users.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não existe' });

    return res.status(200).json(user);
  } catch (err) {
    console.error('getUserById', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { email } = req.user;

    await Users.destroy({ where: { email } });

    return res.status(204).end();
  } catch (err) {
    console.error('deleteUser', err.message);
    return res.status(500).json({ message: 'Error Intern' });
  }
};

module.exports = { createUser, loginUser, getAllUsers, getUserById, deleteUser };
