const express = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', validator, async (req, res) => {
  try {
    const userExists = await User.findOne({
      where: {
        [Op.and]: [{ email: req.body.email, password: req.body.password }],
      },
    });
    if (userExists) {
      const token = createToken(userExists.dataValues);
      res.status(200).json({ token });
    } else if (!userExists) {
      res.status(400).json({ message: 'Campos inválidos' });
    }
  } catch (error) {
    console.log(error, 'cai no erro');
  }
});

module.exports = router;
