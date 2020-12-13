const { User } = require('../models');
const auth = require('../middlewares/auth');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const token = await auth.createToken(user.dataValues);

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { id, ...dataValues } = req.data.dataValues;

  const token = await auth.createToken(dataValues);

  return res.status(200).json({ token });
};

const read = async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
};

const del = async (req, res) => {
  const { email } = req.data;

  await User.destroy({ where: { email } });

  return res.status(204).json({ message: 'Usuário deletado' });
};

module.exports = {
  create,
  login,
  read,
  findById,
  del,
};
