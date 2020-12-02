const express = require('express');
const authLogin = require('../services/authLogin');

const login = express.Router();

login.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const sucessLogin = await authLogin(email, password);
    console.log('sucess', sucessLogin);
    return res.status(200).json(sucessLogin);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = login;
