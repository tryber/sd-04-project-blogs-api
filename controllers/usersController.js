const router = require('express').Router();
const rescue = require('express-rescue');
const { INVALID_ENTRIES, USER_ALREADY_EXISTS } = require('../errors');
const { validate, findUser } = require('../middlewares');
const { Users } = require('../models');
const { createToken } = require('../services/JWT');

const postLogin = rescue(async (req, res) => {
  const { user, body } = req;
  if (!user || user.password !== body.password) throw INVALID_ENTRIES;
  const { password: _, ...withoutPassword } = req.user;
  const token = createToken(withoutPassword);
  res.json({ token });
});

const postRegister = rescue(async (req, res, next) => {
  if (req.user) throw USER_ALREADY_EXISTS;
  await Users.create(req.body);
  req.user = req.body;
  res.status(201);
  next();
});

router.post('/', validate('register'), findUser, postRegister, postLogin);

module.exports = { postLogin: [validate('login'), findUser, postLogin], router };
