const express = require('express');
const loginValidation = require('../middlewares/loginValidations');
const createToken = require('../auth/createToken');
const { User } = require('../models');

const router = express.Router();

router.post(
  '/',
  loginValidation.verifyEmail,
  loginValidation.verifyPassword,
  loginValidation.verifyUserExistence,
  async (req, res) => {
    // const { email, password } = req.body;
    // to desestruturando e tentando chegar o id
    const user = await User.findOne({ where: { email: req.body.email } });
    const { password: _, ...userData } = user;
    // const token = createToken({ email, password });
    const token = createToken({ userData });
    return res.status(200).json({ token });
  },
);

module.exports = router;
