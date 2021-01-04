const express = require('express');
const { UsersModel } = require('../models');
const isValidUser = require('../middlewares/authUsers');
const { createJWT } = require('../middlewares/tokenValidation');

const router = express.Router();

router.post('/user', isValidUser, async (req, res) => {
  try {
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
  }
});

module.exports = router;
