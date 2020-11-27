const express = require('express');
const loginValidation = require('../middlewares/loginValidation');
const createToken = require('../auth/createJWT');

const router = express.Router();

router.post(
  '/',
  loginValidation.checkEmail,
  loginValidation.checkPassword,
  loginValidation.checkUserExists,
  async (req, res) => {
    const { email, password } = req.body;

    const token = createToken({ email, password });

    return res.status(200).json({ token });
  },
);

module.exports = router;
