const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Users } = require('../models');

const router = Router();

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

  const validaEmail = /[A-Z0-9]{1,}@[A-Z0-9]{2,}\.[A-Z0-9]{2,}/i.test(email);
  if (!validaEmail) {
    res.status(400).json({
      message: '"email" must be a valid email',
    });
  }

  const emailUser = await Users.findOne({ where: { email } });

  if (emailUser) {
    res.status(409).json({
      message: 'Usuário já existe',
    });
  }
  await Users.create({ displayName, email, password, image });
  const token = jwt.sign({ data: displayName }, secret, jwtConfig);
  res.status(201).json(token);
});

module.exports = router;
