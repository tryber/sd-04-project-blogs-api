const express = require('express');
const { Users } = require('../models');
const { userValidation, nameValidation, passValidation, emailValidation } = require('../services/userServices');

const router = express.Router();

router.post('/', nameValidation, passValidation, emailValidation, userValidation, (req, res) => {
  const { displayName, email, password, image } = req.body;

  return Users.upsert({ displayName, email, password, image }).then(user => res.status(200).json(user));
});

router.get('/', (req, res) => {
  return Users.findAll().then(users => res.status(200).json(users));
});

module.exports = router;
