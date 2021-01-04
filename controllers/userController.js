const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/', (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(500).json({ message: e });
    });
});

router.post('/', (req, res) => {
  const { displayName, email, password, image } = req.body;
  User.create({ displayName, email, password, image })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) =>
      res.status(400).send({ message: e.message.slice(18) }));
});

module.exports = router;
