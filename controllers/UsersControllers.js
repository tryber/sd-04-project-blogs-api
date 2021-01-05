const express = require('express');
const { Users } = require('../models');
const { isValidUser } = require('../middlewares/authUsers');
const { createJWT, authentication } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', isValidUser, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const creation = await Users.create({
      displayName,
      email,
      password,
      image,
    });
    const { password: _, ...userWithoutPassword } = creation;
    const token = await createJWT(userWithoutPassword);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Erro ao salvar o usuário no banco' });
  }
});

router.get('/', authentication, async (_req, res) => {
  const users = await Users.findAll();
  return res.status(200).json(users);
});

router.get('/:id', authentication, async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
});

router.delete('/me', authentication, async (req, res) => {
  try {
    const { email } = req.user.dataValues;
    await Users.destroy({ where: { email } });
    res.status(204).json();
  } catch (e) {
    res.status(500).json({ message: 'Erro ao deletar usuário' });
  }
});

module.exports = router;
