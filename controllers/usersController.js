const express = require('express');
const { Users } = require('../models');
const usersValidation = require('../middlewares/usersValidation');
const createToken = require('../auth/createJWT');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post(
  '/',
  usersValidation.checkName,
  usersValidation.checkEmail,
  usersValidation.checkPassword,
  usersValidation.checkUserExists,
  async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const token = createToken({ email, password });

    await Users.create({ displayName, email, password, image });

    return res.status(201).json({ token });
  },
);

router.get('/', validateToken, async (req, res) => {
  const users = await Users.findAll({ attributes: { exclude: ['password'] } });
  return res.status(200).json(users);
});

module.exports = router;
