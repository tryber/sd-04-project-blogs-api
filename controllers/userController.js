const express = require('express');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const isInvalid = validator(req.body, res);
    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (!userExists && !isInvalid) {
      const newUser = await User.create({ ...req.body });
      const token = createToken(newUser.dataValues);
      res.status(201).json({ token });
    } else if (userExists && !isInvalid) {
      res.status(409).json({ message: 'Usuário já existe' });
    }
  } catch (error) {
    const { message } = error;
    const { emptyEmail, emptyPass } = req;
    if (!emptyEmail || emptyPass) {
      res.status(400).json({ message: message.slice(18) });
    }
  }
});

module.exports = router;
