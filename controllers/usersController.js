const { Router } = require('express');
const { Users } = require('../models');

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).json(users);
  } catch (_e) {
    res.status(500).json({ message: 'internal error' });
  }
});

module.exports = router;
