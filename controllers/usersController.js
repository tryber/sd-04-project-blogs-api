const usersController = require('express').Router();
const { Users } = require('../models');
const { validateName, validateEmail, validatePassword } = require('../middlewares/userValidations');
const { createToken, validateToken } = require('../authentication');

usersController.post('/', validateName, validateEmail, validatePassword, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  try {
    const createdUser = await Users.create({ displayName, email, password, image });
    const token = createToken(createdUser.dataValues);
    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'algo deu errado' });
  }
});

usersController.get('/', validateToken, async (req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
});

module.exports = usersController;
