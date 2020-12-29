const express = require('express');
const { User } = require('../models');
const { usersCreateMiddleware, auth } = require('../middlewares');
const { validate } = require('../middlewares/auth');

const router = express.Router();

router.post('/', usersCreateMiddleware, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const user = await User.create({ displayName, email, password, image });

  const token = await auth.createToken(user.dataValues);

  res.status(201).json({ token });
});

router.get('/', validate, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
});

router.get('/:id', validate, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
});

router.delete('/me', validate, async (req, res) => {
  const { email } = req.user;

  await User.destroy({ where: { email } });

  return res.status(204).json({ message: 'Usuário deletado' });
});

module.exports = router;
