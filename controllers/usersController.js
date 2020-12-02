const { Users } = require('../models');
const { generateToken } = require('../services');

const findByEmail = async (email) => {
  const user = await Users.findOne({
    where: { email },
  });
  return user;
};


const createUser = async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const user = await Users.create({
      displayName,
      email,
      password,
      image,
    });
    res.status(201).json({ token: generateToken(user) });
  } catch (e) {
    res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user || password.toString() !== user.password) {
      return res.status(400).send({ message: 'Campos inválidos' });
    }
    res.status(200).json({ token: generateToken(user) });
  } catch (e) {
    res.status(400).send({ message: 'Algo deu errado ao tentar fazer o login' });
  }
};

const getAll = async (_req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(401).send({ message: e.message });
  }
};

module.exports = {
  createUser,
  findByEmail,
  login,
  getAll,
};
