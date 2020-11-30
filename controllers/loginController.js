const express = require('express');

const login = express.Router();

login.post('/', async (req, res) => {
  try {
    return res.status(200).json(req.body);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = login;
