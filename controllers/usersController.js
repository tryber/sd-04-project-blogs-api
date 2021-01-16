const userController = require('express').Router();
const { Users } = require('../models');

userController.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const user = Users.create({ displayName, email, password, image });
    res.status(201).json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'algo deu errado' });
  }
});

module.exports = userController;
