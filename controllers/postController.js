const express = require('express');
const validatejwt = require('../auth/validatejwt');
const { Posts, User } = require('../models');

const router = express.Router();

router.post('/', validatejwt, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const published = new Date();
    const updated = new Date();
    if (!title || !content) {
      const message = title ? '"content" is required' : '"title" is required';
      return res.status(400).json({ message });
    }
    const newPost = await Posts.create({
      title,
      content,
      userId: id,
      published,
      updated,
    });
    return res.status(201).json(newPost.dataValues);
  } catch (error) {
    return res.status(500).json({ message: 'erro interno' });
  }
});

router.get('/', validatejwt, async (req, res) => {
  try {
    const posts = await Posts.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      ],
      attributes: { exclude: ['userId'] },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: 'erro interno' });
  }
});

router.get('/:id', validatejwt, async (req, res) => {
  try {
    const post = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
      ],
      attributes: { exclude: ['userId'] },
    });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'erro interno' });
  }
});

router.put('/:id', validatejwt, async (req, res) => {
  try {
    const { title, content } = req.body;
    const updated = new Date();
    if (!title || !content) {
      const message = title ? '"content" is required' : '"title" is required';
      return res.status(400).json({ message });
    }
    const updatepost = await Posts.update(
      { title, content, updated },
      { where: { id: req.params.id, userId: req.user.id } },
    );

    if (updatepost[0] === 0) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    const post = await Posts.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ['published', 'updated'] },
    });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: 'erro interno' });
  }
});

router.delete('/:id', validatejwt, async (req, res) => {
  const postId = req.params.id;
  const post = await Posts.findByPk(postId);
  const { id } = req.user;

  if (!post) return res.status(404).json({ message: 'Post não existe' });
  if (id !== post.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await Posts.destroy({ where: { id: postId } });

  return res.status(204).end();
});

module.exports = router;
