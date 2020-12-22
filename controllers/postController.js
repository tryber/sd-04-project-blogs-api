const { Router } = require('express');
const { Posts, Users } = require('../models');
const { validateToken } = require('../middlewares/validateToken');

const router = Router();

// Req. 6 - Cria um post
router.post('/', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user.dataValues;
    const published = new Date();
    const updated = new Date();
    // validações
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
    const newPost = await Posts.create({ title, content, userId: id, published, updated });
    return res.status(201).json(newPost);
  } catch (_e) {
    return res.status(500).json({ message: 'internal error' });
  }
});

// Req. 7 - Lista todos os posts
router.get('/', validateToken, async (req, res) => {
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
  } catch (_e) {
    return res.status(500).json({ message: 'internal error' });
  }
});

// Req. 8 - Lista o post por id
router.get('/:id', validateToken, async (req, res) => {
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
  } catch (_e) {
    return res.status(500).json({ message: 'internal error' });
  }
});

module.exports = router;
