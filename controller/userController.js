const express = require('express');
const { Users } = require('../model');
const usersValidation = require('../middlewares/usersValidation');
const tokenCreate = require('../service/tokenCreate');
const { tokenValidation } = require('../service/tokenValidation');

const router = express.Router();

router.post(
  '/',
  usersValidation.validateDisplayName,
  usersValidation.validateEmail,
  usersValidation.validatePassword,
  usersValidation.validateUserExistence,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = tokenCreate({ email, password });

    await Users.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
);

router.get('/', tokenValidation, async (_req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
});

router.get('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
  return res.status(200).json(user);
});

router.delete('/me', tokenValidation, async (req, res) => {
  const { email } = req.user;
  await Users.destroy({ where: { email } });
  return res.status(204).json({ message: 'Usuário deletado' });
});

module.exports = router;
