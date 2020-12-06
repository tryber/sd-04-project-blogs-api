const express = require('express');
const { User } = require('../models');
const validationUser = require('../services/validationUser');
const createToken = require('../auth/createToken');
const authMiddleware = require('../middlewares/authMiddleware');

const users = express.Router();

// Rota para adicionar um Usuario!!
users.post('/', async (req, res) => {
  try {
    const allUsers = await User.create({ ...req.body });
    const token = await createToken({ ...allUsers });
    return res.status(201).json({ token });
  } catch (error) {
    console.log(error.message);
    const valid = validationUser(error.message);
    return res.status(valid.code).json({ message: valid.message });
  }
});

// ROTA PARA TRAZER TODOS OS USUARIOS CADASTRADOS NO SISTEMA
users.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await User.findAll();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Trazer um ID especifico de usuario!!
users.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { email } = req.body;
    const result = await User.findOne({ where: { email } });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }
});

users.delete('/me', async (req, res) => {
  try {
    // FAZ UMA MODEL QUE DELETA O PROPRIO USUARIO
    return res.status(200).json({ message: 'Quase' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = users;
