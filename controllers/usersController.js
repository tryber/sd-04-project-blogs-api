const { Router } = require('express');
const { Users } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const usersData = await Users.findAll();
  res.status(200).json(usersData);
});

router.post('/', async (req, res) => {
  const { id, displayName, email, password, image } = req.body;
  const newUser = await Users.create({ id, displayName, email, password, image });
  res.status(200).json({ User: newUser });
});

module.exports = router;
