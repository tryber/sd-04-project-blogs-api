const express = require('express');
const loginValidation = require('../middlewares/loginValidations');
const createToken = require('../auth/createToken');

const router = express.Router();

router.post(
  '/',
  loginValidation.verifyEmail,
  loginValidation.verifyPassword,
  loginValidation.verifyUserExistence,
  async (req, res) => {
    const { email, password } = req.body;

    const token = createToken({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
