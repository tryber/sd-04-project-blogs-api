const express = require('express');
const { User, Post } = require('../models');
const validateToken = require('../auth/validateToken');
const postsValidation = require('../middlewares/postsValidations');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postsValidation.verifyTitle,
  postsValidation.verifyContent,
  async (req, res) => {
    const { email } = req.user;

    const { title, content } = req.body;

    const user = await User.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Post.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  },
);

router.get(
  '/',
  validateToken,
  async (_req, res) => {
    const allPosts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
    });
    return res.status(200).json(allPosts);
  },
);

router.get(
  '/:id',
  validateToken,
  async (req, res) => {
    const { id } = req.params;
    const post = await Post.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
    });

    if (!post) {
      return res.status(404).json({ message: 'Post não existe' });
    }

    return res.status(200).json(post);
  },
);

router.put(
  '/:id',
  validateToken,
  postsValidation.verifyTitle,
  postsValidation.verifyContent,
  postsValidation.verifyPostAuthor,
  async (req, res) => {
    const { userId } = req.user;
    const { id } = req.params;
    const { title, content } = req.body;

    await Post.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId });
  },
);

module.exports = router;
