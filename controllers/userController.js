const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const userRoute = express.Router();

userRoute.post('/', async (req, res) => {
  try {
    validator(req.body, res);
    const validaEmail = await User.findOne({ where: { email: req.body.email } });
    if (!validaEmail) {
      const newUser = await User.create({ ...req.body });
      const token = createToken(newUser.dataValues);
      res.status(201).json({ token });
    }
    res.status(409).json({ message: 'Usuário já existe' });
  } catch (error) {
    const msg = error.message.slice(18);
    res.status(400).json({ message: msg });
  }
});

module.exports = userRoute;
