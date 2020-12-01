const { Users } = require('../models');
const jwt = require('jsonwebtoken');

const findByEmail = async (email) => {
  const user = await Users.findOne({
    where: { email: email },
  });
  return user;
};

const generateToken = (user) => {
  const secret = 'brucewayne';
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
}

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
    console.log(e.message)
    res.status(500).send(e.message);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user || password !== user.password) {
      return res.status(401).send({ message: 'Campos inválidos' });
    }

    res.status(200).json({ token: generateToken(user) });
  } catch (e) {

    res.status(400).send({ message: 'Algo deu errado ao tentar fazer o login' });
  }
}

module.exports = {
  createUser,
  findByEmail,
  login,
};

