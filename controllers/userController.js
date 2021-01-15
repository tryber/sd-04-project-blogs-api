const express = require('express');
const { User } = require('../models');
const JWT = require('../service');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validadeUsers, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailUser = await User.findOne({ where: { email } });
  if (emailUser) {
    res.status(409).json({
      message: 'Usuário já existe',
    });
  }

  const user = await User.create({ displayName, email, password, image });

  // console.log(user.dataValues);
  const token = await JWT.createJWT(user.dataValues);

  res.status(201).json({ token });
});

router.get('/', JWT.validateJWT, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
});

router.get('/:id', JWT.validateJWT, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
});

router.delete('/me', JWT.validateJWT, async (req, res) => {
  const { email } = req.user;

  await User.destroy({ where: { email } });

  return res.status(204).json({ message: 'Usuário deletado' });
});

module.exports = router;
