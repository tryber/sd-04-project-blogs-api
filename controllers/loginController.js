const express = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    validator(req.body, res);
    const userExists = await User.findOne({
      where: {
        [Op.and]: [{ email: req.body.email, password: req.body.password }],
      },
    });
    if (userExists) {
      const token = createToken(userExists.dataValues);
      res.status(200).json({ token });
    }
    res.status(400).json({ message: 'Campos inválidos' });
  } catch (error) {
    const message = error.message.slice(18);
    res.status(400).json({ message });
  }
});

module.exports = router;
