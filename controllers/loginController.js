const express = require('express');
const { Op } = require('sequelize');
const { User } = require('../models');
const createToken = require('../auth/createToken');
const isRequireds = require('../auth/isRequireds');

const loginRoute = express.Router();

loginRoute.post('/', async (req, res) => {
  try {
    isRequireds(req.body, res);
    const usuario = await User.findOne({
      where: {
        [Op.and]: [{ email: req.body.email, password: req.body.password }],
      },
    });
    console.log('usuuario', usuario);
    if (usuario) {
      const token = createToken(usuario.dataValues);
      res.status(200).json({ token });
    }
    res.status(400).json({ message: 'Campos inválidos' });
  } catch (error) {
    const msg = error.message.slice(18);
    // console.log('error!!!!!', msg);
    res.status(400).json({ message: msg });
  }
});

module.exports = loginRoute;
