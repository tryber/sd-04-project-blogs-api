const { Router } = require('express');
const { createJWT, validateToken } = require('../auth');
const { User } = require('../models');
const middlewares = require('../middlewares');

const userRouter = Router();

userRouter.get('/', validateToken, (_req, res) => {
  User.findAll({ attributes: { exclude: ['password'] } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(500).json({ message: e });
    });
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
  } catch (error) {
    return res.status(400).json({ message: error.message.slice(18) });
  }
});

module.exports = userRouter;
