const express = require('express');
const { UsersModel } = require('../models');
const { isValidUser } = require('../middlewares/authUsers');
const { createJWT, authentication } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/', isValidUser, async (req, res) => {
  return res.status(200).json({ oi: 'oi' });
  /* try {
    const { displayName, email, password, image } = req.body;
    const creation = await UsersModel.create({
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
  }*/
});

router.get('/', authentication, async (_req, res) => {
  const users = await UsersModel.findAll();
  return res.status(200).json(users);
});

router.get('/:id', authentication, async (req, res) => {
  const { id } = req.params;
  const user = await UsersModel.findByPk(id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });

  return res.status(200).json(user);
});

module.exports = router;
