const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', validator, async (req, res) => {
  try {
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userExists) {
      const newUser = await User.create({ ...req.body });
      const token = createToken(newUser.dataValues);
      res.status(201).json({ token });
    } else if (userExists) {
      res.status(409).json({ message: 'Usuário já existe' });
    }
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message: message.slice(18) });
  }
});

module.exports = router;
