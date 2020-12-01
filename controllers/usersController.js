const router = require('express').Router();
const rescue = require('express-rescue');
const { INVALID_ENTRIES, USER_ALREADY_EXISTS } = require('../errors');
const { validate, findUser } = require('../middlewares');
const validateToken = require('../middlewares/validateToken');
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

const getUsers = rescue(async (_req, res) => {
  const usersList = await Users.findAll({ attributes: { exclude: ['password'] } });
  res.send(usersList);
});

router.post('/', validate('register'), findUser, postRegister, postLogin);

router.get('/', validateToken, getUsers);

module.exports = { postLogin: [validate('login'), findUser, postLogin], router };
