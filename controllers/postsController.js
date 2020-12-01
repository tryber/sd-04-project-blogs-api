const express = require('express');

const { Users, Posts } = require('../models');

const validationsPosts = require('../middlewares/validationsPosts');
const validationsToken = require('../middlewares/validationsToken');

const router = express.Router();

//  Cria um novo post ---------------------------------------------------------
router.post(
  '/',
  validationsToken,
  validationsPosts.validateTitle,
  validationsPosts.validateContent,
  async (req, res) => {
    const { title, content } = req.body;
    const { email } = req.user;

    const user = await Users.findOne({ where: { email } });
    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  },
);

//  Busca todos os posts ------------------------------------------------------
router.get('/', validationsToken, async (_req, res) => {
  const posts = await Posts.findAll({
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  return res.status(200).json(posts);
});

//  Busca posts por id --------------------------------------------------------
router.get('/:id', validationsToken, async (req, res) => {
  const post = await Posts.findByPk(req.params.id, {
    include: [
      { model: Users, as: 'user', attributes: { exclude: ['password'] } },
    ],
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
});

// Atualiza um post -----------------------------------------------------------
router.put(
  '/:id',
  validationsToken,
  validationsPosts.validateTitle,
  validationsPosts.validateContent,
  validationsPosts.validateUser,
  async (req, res) => {
    const { userId } = req.user;
    const { title, content } = req.body;

    await Posts.update({ title, content }, { where: { id: req.params.id } });

    return res.status(200).json({ title, content, userId });
  },
);

//  Deleta um post ------------------------------------------------------------
router.delete(
  '/:id',
  validationsToken,
  validationsPosts.validateUser,
  async (req, res) => {
    await Posts.destroy({ where: { id: req.params.id } });

    return res.status(204).json({ message: 'Post deletado com sucesso' });
  },
);

module.exports = router;
