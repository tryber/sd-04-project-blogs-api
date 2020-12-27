const express = require('express');
const { auth, loginMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', loginMiddleware, async (req, res) => {
  const { id, ...dataValues } = req.user.dataValues;

  const token = await auth.createToken(dataValues);

  res.status(200).json({ token });
});

module.exports = router;
