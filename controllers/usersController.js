const express = require('express');
const { User } = require('../models');
const { auth, usersCreateMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', usersCreateMiddleware, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const token = await auth.createToken(user.dataValues);

  res.status(201).json({ token });
});

module.exports = router;
