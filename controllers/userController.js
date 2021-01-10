const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    validator(req.body, res);
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userExists) {
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

module.exports = router;
