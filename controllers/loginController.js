const express = require('express');
const { userLoginValidation, dataLoginValidation } = require('../services/loginServices');
const { createToken } = require('../middlewares/auth');

const router = express.Router();

router.post('/', dataLoginValidation, userLoginValidation, (req, res) => {
  const { email, password } = req.body;
  const token = createToken({ email, password });
  return res.status(200).json({ token });
});

module.exports = router;
