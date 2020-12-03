const express = require('express');
const { Users } = require('../models');
const userValidation = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');

const router = express.Router();

router.post(
  '/',
  userValidation.validateDisplayName,
  userValidation.validateEmail,
  userValidation.validatePassword,
  userValidation.validateUserExistence,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = createToken({ email, password });

    await Users.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
);

module.exports = router;