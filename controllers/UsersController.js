const { Users } = require('../models');
const createToken = require('../auth/createToken');

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await Users.findOne({ email, password });

    const { id, displayName, image } = result.dataValues;
    const userData = { id, displayName, image };

    const token = createToken(userData);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const createUsersController = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const result = await Users.create({ displayName, email, password, image });
    const { password: _, ...userData } = result;
    const token = createToken(userData);
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error);
  }
};

const getAllUsersController = async (req, res) => {
  const allUsers = await Users.findAll();
  return res.status(200).json(allUsers);
};

const getByIdController = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  return res.status(200).json(user);
};

const deleteUserController = async (req, res) => {
  const { id } = req.user;
  await Users.destroy({ where: { id } });
  return res.status(204).json();
};

module.exports = {
  createUsersController,
  loginController,
  getAllUsersController,
  getByIdController,
  deleteUserController,
};
