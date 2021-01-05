const express = require('express');
const authMiddleware = require('../middlewares/auth');
const { Users } = require('../models');
const { userValidation, nameValidation, passValidation, emailValidation } = require('../services/userServices');

const router = express.Router();

router.post('/', nameValidation, passValidation, emailValidation, userValidation, (req, res) => {
  const { displayName, email, password, image } = req.body;

  return Users.upsert({ displayName, email, password, image })
    .then((user) => res.status(200).json(user[0]));
});

router.get('/', authMiddleware, (_req, res) => {
  return Users.findAll().then(users => {
    const newUsers = users.map(({ dataValues }) => {
      const { id, displayName, email, image } = dataValues;
      return { id, displayName, email, image };
    });
    return res.status(200).json(newUsers);
  });
});

module.exports = router;
