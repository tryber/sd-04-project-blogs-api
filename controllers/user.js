const { Users } = require('../models');
const TokenService = require('../services/token');

const create = (req, res) => {
  const { displayName, email, password, image } = req.body;

  // const emailCheck = UsersModel.findOne({ where: { email } });

  // (emailCheck.length) return res.status(409).json({ message: 'Usuário já existe' });

  Users.create({ displayName, email, password, image });
  const token = TokenService.create(email, password);

  return res.status(201).json({ token });
};

module.exports = { create };
