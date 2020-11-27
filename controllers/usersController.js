const express = require('express');
const { Users } = require('../models');
const usersValidation = require('../middlewares/usersValidation');
const createToken = require('../auth/createJWT');

const router = express.Router();

router.post(
  '/',
  usersValidation.checkName,
  usersValidation.checkEmail,
  usersValidation.checkPassword,
  usersValidation.checkUserExists,
  async (req, res) => {
    console.log(req.body);
    const { displayName, email, password, image } = req.body;

    const token = createToken({ email, password });

    await Users.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
);

module.exports = router;
