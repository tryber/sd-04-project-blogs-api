const userController = require('express').Router();
const { Users } = require('../models');
const { validateName, validateEmail, validatePassword } = require('../middlewares/userValidations');
const { createToken } = require('../authentication');

userController.post('/', validateName, validateEmail, validatePassword, async (req, res) => {
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

module.exports = userController;
