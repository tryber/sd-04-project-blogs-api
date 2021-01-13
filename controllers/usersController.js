const express = require('express');
const { User } = require('../models');
const validateToken = require('../auth/validateToken');
const createToken = require('../auth/createToken');
const isRequireds = require('../auth/isRequireds');

const usersRoute = express.Router();

// POST PARA CRIAR UM USUARIO NO BANCO
usersRoute.post('/', async (req, res) => {
  try {
    isRequireds({ ...req.body }, res);

    const validation = await User.findOne({ where: { email: req.body.email } });

    if (!validation) {
      const newUser = await User.create({ ...req.body });
      const token = createToken(newUser.dataValues);
      res.status(201).json({ token });
    }

    res.status(409).json({ message: 'Usuário já existe' });
  } catch (error) {
    const message = error.message.slice(18);
    res.status(400).json({ message });
  }
});

// GET PARA TRAZER TODOS OS USUARIOS DO BANCO DE DADOS
usersRoute.get('/', validateToken, async (req, res) => {
  const getAll = await User.findAll();
  res.status(200).json(getAll);
});

// GET PARA TRAZER APENAS UM USUARIO
usersRoute.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const getAll = await User.findOne({ where: { id } });
  if (!getAll) return res.status(404).json({ message: 'Usuário não existe' });
  res.status(200).json(getAll);
});

//  DELETE PARA ESCLUIR USUARIO DO BANCO DE DADOS
usersRoute.delete('/me', validateToken, async (req, res) => {
  const { id } = req.user;
  await User.destroy({ where: { id } });
  res.status(204).json();
});

module.exports = usersRoute;
