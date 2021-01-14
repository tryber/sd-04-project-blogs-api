const express = require('express');
const middlewares = require('../middlewares');
const { User } = require('../models');
const JWT = require('../service');

const router = express.Router();

router.post('/', middlewares.validadeLogin, async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ where: { email } });
  const { id, displayName, image } = user.dataValues;
  const token = await JWT.createJWT({ id, displayName, image });
  res.status(200).json({ token });
});

module.exports = router;
