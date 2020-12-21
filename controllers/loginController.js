const { Router } = require('express');
const { Users } = require('../models');
const { createToken } = require('../middlewares/createToken');

const router = Router();

// Req. 2 - Login do usuário
router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === '') {
      return res.status(400).json({ message: '"email" is not allowed to be empty' });
    }
    if (!email) {
      return res.status(400).json({ message: '"email" is required' });
    }
    if (password === '') {
      return res.status(400).json({ message: '"password" is not allowed to be empty' });
    }
    if (!password) {
      return res.status(400).json({ message: '"password" is required' });
    }

    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Campos inválidos' });
    }

    if (user.password === password) {
      const { password: _, ...userWithoutPassword } = user;
      const token = createToken(userWithoutPassword);
      return res.status(200).json({ token });
    }
  } catch (error) {
    const msg = error.message.slice(18);
    return res.status(400).json({ message: msg });
  }
});

module.exports = router;
