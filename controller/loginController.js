const express = require('express');
const { Users } = require('../models');
const JWT = require('../service');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validadeLogin, async (req, res) => {
  const { email, password } = req.body;

  const userMail = await Users.findAll({ where: { email } });
  if (userMail <= 0) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  const token = JWT.createJWT({ email, password });
  return res.status(400).json({ token });
});

module.exports = router;
