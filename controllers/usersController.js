const router = require('express').Router();
const rescue = require('express-rescue');
const { INVALID_ENTRIES, USER_ALREADY_EXISTS, USER_NOT_FOUND } = require('../errors');
const { validate, findUser, validateToken } = require('../middlewares');
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
  const { dataValues } = await Users.create(req.body);
  req.user = dataValues;
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

const deleteUser = rescue(async (req, res) => {
  const { id } = req.user;
  const result = await Users.destroy({ where: { id } });
  if (!result) throw USER_NOT_FOUND;
  res.status(204).send();
});

router.post('/', validate('register'), findUser, postRegister, postLogin);

router.get('/', validateToken, getUsers);

router.get('/:id', validateToken, getUserById);

router.delete('/me', validateToken, deleteUser);

module.exports = { postLogin: [validate('login'), findUser, postLogin], router };
