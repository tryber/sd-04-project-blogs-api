const { Users } = require('../models');

const userMiddleware = require('../middlewares/userMiddleware');

const insertNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailAlreadyExists = await userMiddleware.emailExists(email);

  if (emailAlreadyExists) return res.status(409).json({ message: 'Usuário já existe' });

  const user = await Users.create({ displayName, email, password, image });

  // PROVISÓRIO, ZUERA...
  const token = user.image;

  res.status(201).json({ token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const notValidLogin = await userMiddleware.validateLogin(email, password);

  if (notValidLogin) return res.status(400).json({ message: notValidLogin.message });

  const userExists = await userMiddleware.userExists(email, password);

  if (!userExists) return res.status(400).json({ message: 'Campos inválidos' });

  const token = '127sjnjnxjn9hx37';
  return res.status(200).json(token);
};

const getAllUsers = async (req, res) => {
  const users = Users.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
};

module.exports = { insertNewUser, getAllUsers, login };
