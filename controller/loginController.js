const express = require('express');
const loginValidation = require('../middlewares/loginValidation');
const tokenCreate = require('../service/tokenCreate');

const router = express.Router();

router.post(
  '/',
  loginValidation.validateEmail,
  loginValidation.validatePassword,
  loginValidation.validateUserExistence,
  async (req, res) => {
    const { email, password } = req.body;

    const token = tokenCreate({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
