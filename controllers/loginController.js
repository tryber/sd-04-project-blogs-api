const express = require('express');
const authMiddleware = require('../middlewares/auth');
const validationsLogin = require('../middlewares/validationsLogin');

const router = express.Router();

router.post(
  '/',
  validationsLogin.validateEmail,
  validationsLogin.validatePassword,
  validationsLogin.validateUser,
  async (req, res) => {
    const { email, password } = req.body;

    const token = authMiddleware({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
