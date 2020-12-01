const rescue = require('express-rescue');
const { User } = require('../models');
const { createToken } = require('../services');

const loginUser = rescue(async (req, res) => {
  try {
    const { displayName, email, image } = req.user;
    const userToken = { displayName, email, image };
    const token = createToken(userToken);
    res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: 'Algo deu errado.' });
  }
});

module.exports = { loginUser };
