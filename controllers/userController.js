const { Router } = require('express');

const { User } = require('../models');

const {
  existingElements,
  typeOfElements,
  isThereMail,
  tokenValidation,
} = require('../middlewares/userValidations');

const users = Router();

users.post('/', existingElements, typeOfElements, isThereMail, (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((newUser) => res.status(201).json(newUser))
    .catch((error) => console.log(error));
});

users.get('/', tokenValidation, (_, res) => {
  User.findAll({
    attributes: {
      exclude: ['password'],
    },
  })
    .then((allUsers) => res.status(200).json(allUsers))
    .catch((error) => console.log(error));
});

module.exports = users;
