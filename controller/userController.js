const express = require('express');
const { Users } = require('...models');
const { createJTW } = require('../service');
const middlewares = require('../middlewares');
const createToken = require('../services/createJWT');

const router = express.Router();

router.post('/', middlewares.validateUsers, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const userMail = await Users.findAll({ where: { email } });
  if (userMail.length > 0) {
    return res.status(409).json({ message: 'Usuário já existe' });
  }

  await Users.create({ displayName, email, password, image });
  const roken = createToken({ email, password });
  return res.status(201).json({ token });
});
