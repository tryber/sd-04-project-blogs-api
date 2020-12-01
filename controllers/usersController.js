const router = require('express').Router();
const rescue = require('express-rescue');
const { INVALID_ENTRIES, USER_ALREADY_EXISTS, USER_NOT_FOUND } = require('../errors');
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
  res.json(usersList);
});

const getUserById = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!user) throw USER_NOT_FOUND;
  res.json(user);
});

router.post('/', validate('register'), findUser, postRegister, postLogin);

router.get('/', validateToken, getUsers);

router.get('/:id', validateToken, getUserById);

module.exports = { postLogin: [validate('login'), findUser, postLogin], router };
