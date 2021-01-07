const express = require('express');
const { authMiddleware, createToken } = require('../middlewares/auth');
const { Users } = require('../models');
const { userValidation, nameValidation, passValidation, emailValidation } = require('../services/userServices');

const router = express.Router();

router.post('/', nameValidation, passValidation, emailValidation, userValidation, async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await Users.create({ displayName, email, password, image });
  const token = createToken({ email, password });
  res.status(201).json({ token });
});

router.get('/', authMiddleware, (_req, res) =>
  Users.findAll().then((users) => {
    const newUsers = users.map(({ dataValues }) => {
      const { id, displayName, email, image } = dataValues;
      return { id, displayName, email, image };
    });
    return res.status(200).json(newUsers);
  }));

module.exports = router;
