const express = require('express');
const { Users } = require('../models');
const { userValidation, nameValidation, passValidation, emailValidation } = require('../services/userServices');
const router = express.Router();

router.post('/', userValidation, nameValidation, passValidation, emailValidation, (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  Users.findAll()
    .then((users) => {
      res.status(200).json(users)
    });
});



module.exports = router;
