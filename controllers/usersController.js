const router = require('express').Router();
const rescue = require('express-rescue');
const { INVALID_ENTRIES } = require('../errors');
const { validateLogin } = require('../middlewares/validationMiddlewares');
const { Users } = require('../models');
const { createToken } = require('../services/JWT');

const postLogin = rescue(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ where: { email } });
  if (!user || user.dataValues.password !== password) throw INVALID_ENTRIES;
  const { password: _, ...withoutPassword } = user.dataValues;
  const token = createToken(withoutPassword);
  res.json({ token });
});

module.exports = { postLogin: [validateLogin, postLogin], router };
