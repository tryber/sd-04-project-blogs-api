const { Users } = require('../models');
const TokenService = require('../services/token');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailCheck = await Users.findOne({ where: { email } });

  if (emailCheck) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await Users.create({ displayName, email, password, image });
  const token = TokenService.create({ userId: user.id, email, password });

  return res.status(201).json({ token });
};

const getAll = async (req, res) => {
  const users = await Users.findAll();

  return res.status(200).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(user);
};

const deleteActualUser = async (req, res) => {
  const { email } = req.user;
  console.log(req.user);
  const user = await Users.findOne({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: 'usuário nãop encontrado' });
  }

  user.destroy();
  return res.status(204).send();
};

module.exports = { create, getAll, getUser, deleteActualUser };
