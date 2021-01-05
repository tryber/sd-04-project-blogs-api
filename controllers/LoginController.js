const express = require('express');
const { Users } = require('../models');
const { createJWT } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) res.status(400).json({ message: '"email" is required' });
    if (!password) res.status(400).json({ message: '"passowrd" is required' });
    if (email.length === 0) res.status(400).json({ message: '"email" is not allowed to be empty' });
    if (password.length === 0) res.status(400).json({ message: '"password" is not allowed to be empty' });

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ message: 'Campos Inválidos' });
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = await createJWT(userWithoutPassword);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Erro ao salvar o usuário no banco' });
  }
});

module.exports = router;
