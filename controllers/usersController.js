const { Router } = require('express');
const { users } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const usersData = await users.findAll();
  res.status(200).json(usersData);
});

module.exports = router;
