const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', validator, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userExists) {
      console.log(req.body, 'if');
      const newUser = await User.create({ displayName, email, password, image });
      const token = createToken(newUser.dataValues);
      res.status(201).json({ token });
    } else if (userExists) {
      res.status(409).json({ message: 'Usuário já existe' });
    }
  } catch (error) {
    console.log(req.body, 'catch');
    const { message } = error;
    res.status(400).json({ message: message.slice(18) });
  }
});

module.exports = router;
