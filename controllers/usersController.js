const express = require('express');
const { User } = require('../models');
const validationUser = require('../services/validationUser');
const createToken = require('../auth/createToken');

const users = express.Router();

// Rota para adicionar um Usuario!!
users.post('/', async (req, res) => {
  try {
    const allUsers = await User.create({ ...req.body });
    const token = await createToken({ ...allUsers });
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error.message);
    const valid = validationUser(error.message);
    return res.status(500).json(valid);
  }
});

// Trazer um ID especifico de usuario!!
users.get('/:id', async (req, res) => {
  try {
    // FAZ UM PEDIDO DE UM MODEL TRAZENDO O ID
    const { id } = req.params;
    const result = await User.findByPk(id);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
