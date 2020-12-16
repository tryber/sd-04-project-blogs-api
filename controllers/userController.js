const { Router } = require('express');
const { Users } = require('../models');
const { createToken } = require('../auth/createToken');
// const { validateToken } = require('../middlewares/validateToken');

const router = Router();

// Req. 3 - Lista todos os usuários
// Incompleto
router.get('/', /* validateToken, */ async (_req, res) => {
  try {
    const users = await Users.findAll();
    // const usersWithoutPassword = users.reduce()
    return res.status(200).json(users);
  } catch (_e) {
    res.status(500).json({ message: 'internal error' });
  }
});

// Req. 1 - Cadastra um usuário
router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    // validações para email e password
    if (!email) {
      return res.status(400).json({ message: '"email" is required' });
    }
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }

    const user = await Users.findOne({ where: { email } });
    if (user) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    const newUser = await Users.create({ displayName, email, password, image });

    const { password: _, ...userWithoutPassword } = newUser;
    const token = createToken(userWithoutPassword);
    return res.status(201).json({ token });
  } catch (error) {
    // console.log('ERROR: ', error);
    const msg = error.message.slice(18);
    return res.status(400).json({ message: msg });
  }
});

module.exports = router;
