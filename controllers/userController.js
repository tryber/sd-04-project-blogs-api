const express = require('express');
const { Users } = require('../models');
const createToken = require('../auth/jwtCreate');
const validator = require('../auth/validator');
const validatejwt = require('../auth/validatejwt');

const userRoute = express.Router();

userRoute.post('/', async (req, res) => {
  try {
    validator(req.body, res);
    const validaEmail = await Users.findOne({ where: { email: req.body.email } });
    if (!validaEmail) {
      const newUser = await Users.create({ ...req.body });
      const token = createToken(newUser.dataValues);
      return res.status(201).json({ token });
    }
    return res.status(409).json({ message: 'Usuário já existe' });
  } catch (error) {
    const msg = error.message.slice(18);
    return res.status(400).json({ message: msg });
  }
});

userRoute.get('/', validatejwt, async (_req, res) => {
  const users = await Users.findAll();
  return res.status(200).json(users);
});

userRoute.get('/:id', validatejwt, async (req, res) => {
  const user = await Users.findByPk(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(user);
});

userRoute.delete('/me', validatejwt, async (req, res) => {
  const userId = req.user.id;
  await Users.destroy({ where: { id: userId } });
  return res.status(204).json({});
});

module.exports = userRoute;
