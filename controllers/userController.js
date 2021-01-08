const rescue = require('express-rescue');
const userService = require('../services/userService');

const create = rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const newUser = await userService.create(displayName, email, password, image);

  res.status(201).json(newUser);
});

const edit = rescue(async (req, res) => {
  const { name, email } = req.body;
  const user = await userService.edit(name, email);

  res.status(200).json(user);
});

const all = rescue(async (req, res) => {
  const users = await userService.all();

  res.status(200).json(users);
});

const viewOne = rescue(async (req, res) => {
  const { id } = req.params;
  const user = await userService.viewOne(id);

  res.status(200).json(user);
});

const destroy = rescue(async (req, res) => {
  const { id } = req.user;

  await userService.destroy(id);

  res.status(204).json();
});

module.exports = { create, edit, all, viewOne, destroy };
