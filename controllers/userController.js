const express = require('express');
const { authMiddleware, createToken } = require('../middlewares/auth');
const { Users } = require('../models');
const { userValidation, nameValidation, passValidation, emailValidation } = require('../services/userServices');
const usersWithouPass = require('../utils/userWithoutPass');

const router = express.Router();

router.post('/', nameValidation, passValidation, emailValidation, userValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await Users.create({ displayName, email, password, image });
  const token = createToken({ email, password });
  res.status(201).json({ token });
});

router.get('/', authMiddleware, (_req, res) =>
  Users.findAll().then((users) => res.status(200).json(usersWithouPass(users))));

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.params.id } });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não existe' });
    }
    return res.status(200).json(usersWithouPass([user])[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Um erro enesperado aconteceu:${err}`);
  }
});

router.delete('/me', authMiddleware, (req, res) => {
  const { user } = req;
  Users.delete({ where: { email: user.email } });
  return res.status(204).sendStatus(204);
});
module.exports = router;
