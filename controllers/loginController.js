const { Router } = require('express');

const { User } = require('../models');

const {
  existingValues,
  emptyValue,
} = require('../middlewares/loginValidations');

const login = Router();

login.post('/', existingValues, emptyValue, (req, res) => {
  const { email, password } = req.body;
  const token = req.headers.authorization;
  User.findOne({
    where: { email, password },
  })
    .then((user) => {
      if (user === null) {
        return res.status('400').json({ message: 'Campos inválidos' });
      }
      return res.status('200').json({ token });
    })
    .catch((error) => console.log(error));
});

module.exports = login;
