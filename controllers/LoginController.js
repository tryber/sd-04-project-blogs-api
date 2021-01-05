const express = require('express');
const { Users } = require('../models');
const { createJWT } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === undefined) res.status(400).json({ message: '"email" is required' });
    if (password === undefined) res.status(400).json({ message: '"password" is required' });
    if (email.length === 0) res.status(400).json({ message: '"email" is not allowed to be empty' });
    if (password.length === 0) res.status(400).json({ message: '"password" is not allowed to be empty' });

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Campos inválidos' });
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = await createJWT(userWithoutPassword);
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Erro ao salvar o usuário no banco' });
  }
});

module.exports = router;
