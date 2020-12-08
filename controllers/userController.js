const { Router } = require('express');
const { User } = require('../models');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ ok: 'yes' });
});

module.exports = router;
