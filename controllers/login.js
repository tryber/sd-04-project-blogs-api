const { Users } = require('../models');
const TokenService = require('../services/token');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email, password } });

  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  const token = TokenService.create(email, password);

  return res.status(200).json({ token });
};

module.exports = { login };
