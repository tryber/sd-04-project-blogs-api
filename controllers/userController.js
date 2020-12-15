const { Router } = require('express');

const { User } = require('../models');

const users = Router();

users.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((newUser) => res.status(200).json(newUser))
    .catch((error) => console.log(error));
});

module.exports = users;
