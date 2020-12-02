const { User } = require('../models');
const auth = require('../middlewares/auth');
const { validateUser, emailExists, validateLogin, userExists } = require('../services/userServices');

const newUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const isNotValid = validateUser(displayName, email, password);
  if (isNotValid) return res.status(400).json({ message: isNotValid.message });

  const isThereEmail = await emailExists(email);

  if (isThereEmail) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await User.create({ displayName, email, password, image });

  const token = await auth.generateToken(user.dataValues);

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const isNotValid = validateLogin(email, password);
  if (isNotValid) return res.status(400).json({ message: isNotValid.message });

  const user = await userExists(email, password);
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  const token = auth.generateToken(user.dataValues);

  return res.status(200).json({ token });
};

const getUsers = async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
};

const findUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  const { email } = req.user;
  await User.destroy({ where: { email } });
  return res.status(204).json({ message: 'Usuário deletado com sucesso' });
};

module.exports = {
  newUser,
  login,
  getUsers,
  findUserById,
  deleteUser,
};
