const { Users } = require('../models');
const { createToken } = require('../service');

const createUserControl = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userMail = await Users.findAll({ where: { email } });
  if (userMail.length > 0) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  const newUser = await Users.create({ displayName, email, password, image });

  return res.status(201).json(newUser);
};

const loginUserControl = async (req, res) => {
  const { email, password } = req.body;

  const userMail = await Users.findAll({ where: { email } });
  if (userMail <= 0) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = createToken({ email, password });
  return res.status(200).json({ token });
};

module.exports = {
  createUserControl,
  loginUserControl,
};
