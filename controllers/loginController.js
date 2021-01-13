const express = require('express');
const { Op } = require('sequelize');
const { Users } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const router = express.Router();

router.post('/', validator, async (req, res) => {
  try {
    const userExists = await Users.findOne({
      where: {
        [Op.and]: [{ email: req.body.email, password: req.body.password }],
      },
    });
    if (userExists) {
      const token = createToken(userExists.dataValues);
      return res.status(200).json({ token });
    } if (!userExists) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }
  } catch (error) {
    console.log(error, 'cai no erro');
  }
});

module.exports = router;
