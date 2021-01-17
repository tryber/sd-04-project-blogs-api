const validator = require('validator');
const jwt = require('jsonwebtoken');
const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const { Users } = require('../models');

const router = Router();

// Configura o jwt
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const secret = 'user';

  if (String(password).length < 6) {
    res.status(400).json({
      message: '"password" length must be 6 characters long',
    });
  }

  if (displayName.length < 8) {
    res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }

  if (!email) {
    res.status(400).json({
      message: '"email" is required',
    });
  }

  if (!password) {
    res.status(400).json({
      message: '"password" is required',
    });
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  const userEmail = await Users.findOne({ where: { email } });
  if (userEmail) {
    res.status(409).json({
      message: 'Usuário já existe',
    });
  }

  await Users.create({ displayName, email, password, image });
  const token = jwt.sign({ data: displayName }, secret, jwtConfig);

  res.status(201).json(token);
});

router.get('/', validateJWT, async (req, res) => {
  const users = await Users.findAll();

  res.status(200).json(users);
});

router.get('/:id', validateJWT, async (req, res) => {
  const user = await Users.findByPk(req.params.id);

  if (!user) {
    res.status(404).json({ message: 'Usuário não existe' });
  }

  res.status(200).json(user);
});

router.delete('/me', validateJWT, async (req, res) => {
  const { data } = req.user;

  await Users.destroy({ where: { displayName: data } });

  res.status(204).json();
});

module.exports = router;
