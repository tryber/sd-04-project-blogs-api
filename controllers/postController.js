const { Router } = require('express');
const { Op } = require('sequelize');
const { validateToken } = require('../auth');
const { Posts, Users } = require('../models');
const middlewares = require('../middlewares');

const postRouter = Router();

postRouter.delete('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const { id: postId } = req.params;

    const post = await Posts.findOne({ where: { id: postId } });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    const deletedPost = await Posts.destroy({
      where: { id: postId, userId: id },
    });

    if (deletedPost === 0) return res.status(401).json({ message: 'Usuário não autorizado' });

    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

postRouter.get('/', validateToken, async (_req, res) => {
  try {
    const posts = await Posts.findAll({
      include: {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

postRouter.get('/search', validateToken, async (req, res) => {
  try {
    const { q } = req.query;

    const posts = await Posts.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      attributes: { exclude: ['userId'] },
    });

    if (!posts) return res.status(200).json([]);

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

postRouter.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Posts.findOne({
      where: { id },
      include: {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

postRouter.post('/', validateToken, middlewares.postVal, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const newPost = await Posts.create({ title, content, userId: id });
    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

postRouter.put('/:id', validateToken, middlewares.postVal, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const { id: postId } = req.params;
    const updatePost = await Posts.update(
      { title, content, userId: id },
      { where: { id: postId, userId: id } },
    );

    if (updatePost[0] === 0) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    const updatedPost = await Posts.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['published', 'updated'] },
    });

    return res.status(200).json(updatedPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = postRouter;
