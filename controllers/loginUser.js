const jwt = require('jsonwebtoken');
const { Router } = require('express');
const { Users } = require('../models');

const router = Router();

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined) {
      res.status(400).json({
        message: '"email" is required',
      });
    }
    if (email.length === 0) {
      res.status(400).json({
        message: '"email" is not allowed to be empty',
      });
    }
    if (password === undefined) {
      res.status(400).json({
        message: '"password" is required',
      });
    }

    if (String(password).length === 0) {
      res.status(400).json({
        message: '"password" is not allowed to be empty',
      });
    }

    // Verifica se usuário já foi cadastrado no banco
    const emailUser = await Users.findOne({ where: { email } });
    if (!emailUser) {
      res.status(400).json({
        message: 'Campos inválidos',
      });
    }

    // Cria o token jwt que valida login do usuário
    const secret = 'user';
    const token = jwt.sign({ data: emailUser.displayName }, secret, jwtConfig);

    res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Internal Error', error: err });
  }
});

module.exports = router;
