const express = require('express');
const { User } = require('../models');
const userValidations = require('../middlewares/userValidations');
const createToken = require('../auth/createToken');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post(
  '/',
  userValidations.verifyDisplayName,
  userValidations.verifyEmail,
  userValidations.verifyPassword,
  userValidations.verifyUserExistence,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = createToken({ email, password });

    await User.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
);

router.get(
  '/',
  validateToken,
  async (_req, res) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  },
);

router.get(
  '/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(user);
  },
);

router.delete(
  '/me',
  validateToken,
  async (req, res) => {
    const { email } = req.user;
    await User.destroy({ where: { email } });
    return res.status(204).json({ message: 'Usuário deletado' });
  },
);

module.exports = router;
