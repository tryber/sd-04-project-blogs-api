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
  try {
    const { displayName, email, password, image } = req.body;
    if (!email) return res.status(400).json({ message: '"email" is required' });
    const emailValidation = await User.findOne({ where: { email } });
    if (!emailValidation) {
      return User.create({ displayName, email, password, image })
        .then((user) => createJWT(user.dataValues))
        .then((token) => {
          res.status(201).json({ token });
        });
    }
    return res.status(409).json({ message: 'Usuário já existe' });
  } catch (error) {
    res.status(400).send({ message: error.message.slice(18) });
  }
});

module.exports = userRouter;
