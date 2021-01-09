const express = require('express');
const { Op } = require('sequelize');
const { Users } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
  try {
    validator(req.body, res);
    const usuario = await Users.findOne({ where: {
      [Op.and]: [{ email: req.body.email, password: req.body.password }],
    } });
    if (usuario) {
      const token = createToken(usuario.dataValues);
      return res.status(200).json({ token });
    }
    return res.status(400).json({ message: 'Campos inválidos' });
  } catch (error) {
    const msg = error.message.slice(18);
    console.log('error!!!!!', msg);
    return res.status(400).json({ message: msg });
  }
});

module.exports = loginRoute;
