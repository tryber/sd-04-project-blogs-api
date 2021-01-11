const { Router } = require('express');
const { createJWT, validateToken } = require('../auth');
const { User } = require('../models');
const middlewares = require('../middlewares');

const userRouter = Router();

userRouter.get('/', validateToken, async (_req, res) => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

userRouter.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não existe' });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

userRouter.delete('/me', validateToken, async (req, res) => {
  try {
    const { email } = req.user;

    await User.destroy({ where: { email } });

    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

userRouter.post('/', middlewares.userVal, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  try {
    const emailValidation = await User.findOne({ where: { email } });
    if (!emailValidation) {
      const newUser = await User.create({ displayName, email, password, image });
      const usrToken = createJWT(newUser.dataValues);
      return res.status(201).json({ usrToken });
    }
    return res.status(409).json({ message: 'Usuário já existe' });
  } catch (err) {
    return res.status(400).json({ message: err.message.slice(18) });
  }
});

module.exports = userRouter;
