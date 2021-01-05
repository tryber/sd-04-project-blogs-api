const { Users } = require('../models');

const userMiddleware = require('../middlewares/userMiddleware');

const authMiddleware = require('../middlewares/authMiddleWare');
const authMiddleWare = require('../middlewares/authMiddleWare');

const insertNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const emailAlreadyExists = await userMiddleware.emailExists(email);

    if (emailAlreadyExists) return res.status(409).json({ message: 'Usuário já existe' });

    const user = await Users.create({ displayName, email, password, image });

    const token = authMiddleware.createNewJWT(user.dataValues);

    res.status(201).json(token);
  } catch (err) {
    console.error(err);

    res.status(400).json({ message: 'Something wrong... Create user' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const notValidLogin = await userMiddleware.validateLogin(email, password);

    if (notValidLogin) return res.status(400).json({ message: notValidLogin.message });

    const userExists = await userMiddleware.userExists(email, password);

    console.log('Login contoller', userExists);

    if (!userExists) return res.status(400).json({ message: 'Campos inválidos' });

    const token = authMiddleWare.createNewJWT(userExists);

    return res.status(200).json(token);
  } catch (err) {
    console.error(err);

    res.status(400).json({ message: 'Something wrong... Login' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.findAll({ attributes: { exclude: ['password'] } });

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);

    res.status(400).json({ message: 'Something wrong...' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);

    res.status(401).json({ msg: 'Something wrong...' });
  }
};

const removeUser = async (req, res) => {
  try {
    await Users.destroy({ where: { id: req.params.id } });

    return res.status(204).json();
  } catch (err) {
    console.error(err);

    res.status(400).json({ msg: 'Something wrong...' });
  }
};

module.exports = { insertNewUser, getAllUsers, login, getUserById, removeUser };
