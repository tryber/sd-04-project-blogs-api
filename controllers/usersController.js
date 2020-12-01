const { Users } = require('../models');
const { createToken } = require('../services/auth');

exports.post = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const token = createToken({ email, password });

  await Users.create({ displayName, email, password, image });

  return res.status(201).json({ token });
};

exports.get = async (_req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id, {
    attributes: { exclude: ['password'] },
  });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  return res.status(200).json(user);
};

exports.delete = async (req, res) => {
  const { email } = req.user;
  await Users.destroy({ where: { email } });
  return res.status(204).json({ message: 'Usuário deletado com sucesso' });
};
