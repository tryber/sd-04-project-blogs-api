const express = require('express');
const { Op } = require('sequelize');
const { Users, Posts } = require('../models');
const { validateToken } = require('../auth/validateToken');
const postsValidation = require('../middlewares/postsValidation');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postsValidation.validateTitle,
  postsValidation.validateContent,
  async (req, res) => {
    const { email } = req.user;

    const { title, content } = req.body;

    const user = await Users.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  },
);

router.get('/', validateToken, async (_req, res) => {
  const allPosts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(allPosts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
});

router.put(
  '/:id',
  validateToken,
  postsValidation.validateTitle,
  postsValidation.validateContent,
  postsValidation.validatePostAuthor,
  async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;

    await Posts.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId });
  },
);

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;

  if (q.length === 0) {
    const posts = await Posts.findAll({
      include: { model: Users, as: 'user' },
    });
    return res.status(200).json(posts);
  }

  const searchPost = await Posts.findAll({
    where: {
      [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
    },
    include: { model: Users, as: 'user' },
  });
  return res.status(200).json(searchPost);
});

router.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.user;
  const post = await Posts.findOne({ where: { id: req.params.id } });
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  if (id !== post.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await Posts.destroy({ where: { id: req.params.id } });
  console.log(teste);
  return res.status(204).json({ message: 'Post deletado com sucesso' });
});

module.exports = router;
