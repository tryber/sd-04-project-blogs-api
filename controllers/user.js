const { Users } = require('../models');
const TokenService = require('../services/token');

const create = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailCheck = await Users.findOne({ where: { email } });

  console.log(emailCheck);

  if (emailCheck) return res.status(409).json({ message: 'Usuário já existe' });

  await Users.create({ displayName, email, password, image });
  const token = TokenService.create(email, password);

  return res.status(201).json({ token });
};

module.exports = { create };
