const { Router } = require('express');

const { User } = require('../models');

const {
  existingElements,
  typeOfElements,
  isThereMail,
  tokenValidation,
} = require('../middlewares/userValidations');

const validateToken = require('../auth/validateToken');

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

users.get('/:id', tokenValidation, (req, res) => {
  const { id } = req.params;
  User.findOne({
    where: { id },
    attributes: {
      exclude: ['password'],
    },
  })
    .then((selectedUser) => {
      if (selectedUser === null) {
        return res.status(404).json({ message: 'Usuário não existe' });
      }
      res.status(200).json(selectedUser);
    })
    .catch((error) => console.log(error));
});

users.delete('/me', tokenValidation, (req, res) => {
  const { email } = validateToken(req.headers.authorization);
  User.destroy({
    where: { email },
  })
    .then(() => res.status(204).json())
    .catch((error) => console.log(error));
});

module.exports = users;
