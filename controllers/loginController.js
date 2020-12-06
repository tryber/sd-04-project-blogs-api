const express = require('express');
const authLogin = require('../services/authLogin');

const login = express.Router();

login.post('/', async (req, res) => {
  const { email, password } = req.body;
  const sucessLogin = await authLogin(email, password);
  return res.status(sucessLogin.code).json({ message: sucessLogin.message });
});

module.exports = login;
