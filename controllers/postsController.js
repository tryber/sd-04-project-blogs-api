const express = require('express');
const { Posts, Users } = require('../models');
const validateToken = require('../auth/validateToken');
const postsValidation = require('../services/postsValidation');

const postsRouter = express.Router();

// POST PARA CRIAR UM USUARIO NO BANCO
postsRouter.post('/', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    postsValidation({ ...req.body }, res);
    const { id } = req.user;
    const createPost = await Posts.create({ title, content, userId: id });
    const { id: _, ...newPost } = createPost.dataValues;
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

postsRouter.get('/', validateToken, async (req, res) => {
  try {
    const allPosts = await Posts.findAll({
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
      attributes: { exclude: ['userId'] },
    });
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

postsRouter.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.findOne({
      where: { id },
      include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    });
    if (!post) return res.status(404).json({ message: 'Post não existe' });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// postsRouter.put('/:id', validateToken, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const allPosts = await Posts.findOne({
//       where: { id },
//       include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
//     });
//     if (!allPosts) return res.status(404).json({ message: 'Post não existe' });
//     res.status(200).json(allPosts);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

postsRouter.delete('/:id', validateToken, async (req, res) => {
  const { id } = req.params;

  const post = await Posts.findOne({
    where: { id },
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  if (req.user.id === post.userId) {
    await Posts.destroy({ where: { id } });
    return res.status(204).json();
  }
  return res.status(401).json({ message: 'Usuário não autorizado' });
});

module.exports = postsRouter;
