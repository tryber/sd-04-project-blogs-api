const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const secret = 'opensecret';
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const { password: _, ...userWithoutPassword } = user;
    const jwtConfig = {
      expiresIn: '15m',
      algorithm: 'HS256',
    };
    const tokenn = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);
    res.status(200).json({ token: tokenn });
  } catch (e) {
    console.log(e.message);
    res.status(401).json({ message: 'Incorrect username or password' });
  }
});

module.exports = router;
