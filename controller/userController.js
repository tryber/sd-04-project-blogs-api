const { userModel } = require('../model');
const { tokenCreate } = require('../service');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userMail = await userModel.findAll({ where: { email } });
  if (userMail.length > 0) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  await userModel.create({ displayName, email, password, image });
  const token = tokenCreate({ email, password });
  return res.status(201).json({ token });
};

const loginControl = async (req, res) => {
  const { email, password } = req.body;

  const userMail = await userModel.findAll({ where: { email } });
  if (userMail <= 0) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = tokenCreate({ email, password });
  return res.status(200).json({ token });
};

const findAllUser = async (_req, res) => {
  const allUsers = await userModel.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(allUsers);
};

const findUserId = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findOne({ where: { id } });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  userModel.destroy({ where: { id } });
  return res.status(204).json();
};

module.exports = {
  createUser,
  findAllUser,
  findUserId,
  deleteUser,
  loginControl,
};
