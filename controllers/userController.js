const { Users } = require('../models');

const userMiddleware = require('../middlewares/userMiddleware');

const insertNewUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;
  console.log(email);

  try {
    const emailAlreadyExists = await userMiddleware.emailExists(email);

    if (emailAlreadyExists) return res.status(409).json({ message: 'Usuário já existe' });

    const user = await Users.create({ displayName, email, password, image });

    // PROVISÓRIO, ZUERA...
    const token = user.image;

    res.status(201).json({ token });
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

    if (!userExists) return res.status(400).json({ message: 'Campos inválidos' });

    const token = '127sjnjnxjn9hx3ssas7';

    return res.status(200).json(token);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong...' });
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

module.exports = { insertNewUser, getAllUsers, login };
