const express = require('express');
const encrypt = require('jsonwebtoken');
require('dotenv/config');
const { User } = require('../models');

const router = express.Router();
const jwt = require('../middlewares/auth');

const mailValidate = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/i;

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;

  //  display validation
  if (displayName.length < 8) {
    return res
      .status(400)
      .json({ message: '"displayName" length must be at least 8 characters long' });
  }

  //  email validation
  if (!email) return res.status(400).json({ message: '"email" is required' });

  if (!mailValidate.test(email)) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }

  //  user validation
  const userExists = await User.findOne({ where: { email } });
  if (userExists) return res.status(409).json({ message: 'Usuário já existe' });

  //  password validation
  if (!password) return res.status(400).json({ message: '"password" is required' });

  if (password.length < 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }

  const user = { displayName, email, password, image };

  const token = jwt.createToken(user);

  await User.create(user);

  res.status(201).json({ token });
});

router.get('/', jwt.validateJWT, async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

router.get('/:id', jwt.validateJWT, async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  const { id, displayName, email, image } = user;

  res.status(200).json({ id, displayName, email, image });
});

router.delete('/me', jwt.validateJWT, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, process.env.SECRET);

  await User.destroy({ where: { email: decoded.data.email } });

  res.status(204).end();
});

module.exports = router;
