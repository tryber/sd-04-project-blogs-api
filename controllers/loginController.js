const express = require('express');
const middlewares = require('../middlewares');
const JWT = require('../service');
// const { auth, loginMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', middlewares.validadeLogin, async (req, res) => {
  const { id, ...dataValues } = req.user.dataValues;

  const token = await JWT.createJWT(dataValues);

  res.status(200).json({ token });
});

module.exports = router;
