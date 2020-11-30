const express = require('express');
const { Users } = require('../models');
const authMiddleware = require('../middlewares/auth');
const validationsUser = require('../middlewares/validationsUser');
const validationsToken = require('../middlewares/validationsToken');

const router = express.Router();

router.post(
  '/',
  validationsUser.validateName,
  validationsUser.validatePassword,
  validationsUser.validateEmail,
  validationsUser.validadeUser,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = authMiddleware({ email, password });

    await Users.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
);

router.get('/', validationsToken, async (_req, res) => {
  const users = await Users.findAll({
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });

  return res.status(200).json(users);
});

router.get('/:id', validationsToken, async (req, res) => {
  const user = await Users.findByPk(req.params.id, {
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(user);
});

router.delete('/me', validationsToken, async (req, res) => {
  const { email } = req.user;

  await Users.destroy({ where: { email } });

  return res.status(204).json({ message: 'Usuário deletado com sucesso' });
});

module.exports = router;
