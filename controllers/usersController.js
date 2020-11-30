const express = require('express');

const users = express.Router();

users.post('/', async (req, res) => {
  try {
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

users.get('/:id', async (req, res) => {
  try {
    // FAZ UM PEDIDO DE UM MODEL TRAZENDO O ID
    return res.status(200).json({ message: 'Quase' });
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
