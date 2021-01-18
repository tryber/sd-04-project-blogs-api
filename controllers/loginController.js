const jwt = require('jsonwebtoken');

const { Router } = require('express');
const { Users } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const users = await Users.findAll();
  res.status(200).json(users);
});

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined) {
      res.status(400).json({
        message: '"email" is required',
      });
    }

    if (password === undefined) {
      res.status(400).json({
        message: '"password" is required',
      });
    }

    if (String(password).length === 0) {
      res.status(400).json({
        message: '"password" is not allowed to be empty',
      });
    }

    if (email.length === 0) {
      res.status(400).json({
        message: '"email" is not allowed to be empty',
      });
    }

    const userEmail = await Users.findOne({ where: { email } });

    if (!userEmail) {
      res.status(400).json({
        message: 'Campos inválidos',
      });
    }

    const secret = 'user';
    const token = jwt.sign({ data: userEmail.displayName }, secret, jwtConfig);
    res.status(200).json({ token: `${token}` });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error', error: err });
  }
});

module.exports = router;
