const express = require('express');
const jwt = require('jsonwebtoken');
const { userErrorDealer } = require('../middlewares/validateInfo');
const validateJwt = require('../middlewares/validateJwt');
const { User } = require('../models');

const router = express.Router();
// validation sequelize https://www.youtube.com/watch?v=3RzW3IqtGR0

router.get('/:id', validateJwt, async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user === null) {
    res.status(404).json({ message: 'Usuário não existe' });
  }
  res.status(200).json(user);
});

router.get('/', validateJwt, async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

router.post('/', userErrorDealer, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const secret = 'opensecret';
  const jwtConfig = {
    expiresIn: '15m',
    algorithm: 'HS256',
  };
  try {
    const emailFound = await User.findOne({ where: { email } });
    if (!emailFound) {
      const { password: _, ...userWithoutPassword } = req.body;
      const tokenn = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
      await User.create({ displayName, email, password, image });
      res.status(201).json({ token: tokenn });
    } else {
      res.status(409).json({ message: 'Usuário já existe' });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json(e.message);
  }
});

module.exports = router;
