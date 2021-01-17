const express = require('express');
const { User } = require('../models');

const router = express.Router();
const jwt = require('../middlewares/auth');

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  //  email validation
  if (email === '') return res.status(400).json({ message: '"email" is not allowed to be empty' });
  if (!email) return res.status(400).json({ message: '"email" is required' });

  //  password validation
  if (password === '')
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  if (!password) return res.status(400).json({ message: '"password" is required' });

  //  user validation
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  const token = jwt.createToken(user);

  res.status(200).json({ token });
});

module.exports = router;
