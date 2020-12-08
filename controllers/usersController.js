const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/createToken');
const isRequireds = require('../auth/isRequireds');

const usersRoute = express.Router();

usersRoute.post('/', async (req, res) => {
  try {
    isRequireds({ ...req.body }, res);

    const validation = await User.findOne({ where: { email: req.body.email } });

    if (!validation) {
      const newUser = await User.create({ ...req.body });
      const token = createToken(newUser.dataValues);
      res.status(201).json({ token });
    }

    res.status(409).json({ message: 'Usuário já existe' });
  } catch (error) {
    const message = error.message.slice(18);
    res.status(400).json({ message });
  }
});

module.exports = usersRoute;
