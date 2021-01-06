const { Router } = require('express');
const { createJWT } = require('../auth/createJWT');
const { User } = require('../models');

const userRouter = Router();

userRouter.get('/', (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(500).json({ message: e });
    });
});

userRouter.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  if (!email) return res.status(400).json({ message: '"email" is required' });
  if (!password) return res.status(400).json({ message: '"password" is required' });
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
