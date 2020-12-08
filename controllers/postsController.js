const { Router } = require('express');
const { Posts, Users } = require('../models');
const validateToken = require('../services/validateToken');
const {
  titleRequired,
  contentRequired,
  postOwnerValidation,
} = require('../middlewares/postsValidation');

const router = Router();

// Cria um blogPost.
router.post('/',
  validateToken,
  titleRequired,
  contentRequired,
  async (req, res) => {
    try {
      const { email } = req.user;
      const { title, content } = req.body;

      const user = await Users.findOne({ where: { email } });

      const post = await Posts.create({ userId: user.id, title, content });

      return res.status(201).json({
        title: post.title,
        content: post.content,
        userId: post.userId,
      });
    } catch (e) {
      console.error('createAPost', e.message);
      return res.status(500).json({ message: 'Error Intern' });
    }
  });

// Lista todos os Posts.
router.get('/',
  validateToken,
  async (_req, res) => {
    try {
      const allPosts = await Posts.findAll({
        include: { model: Users, as: 'user' },
        attributes: { exclude: ['userId'] },
      });

      return res.status(200).json(allPosts);
    } catch (e) {
      console.error('getAllPosts', e.message);
      return res.status(500).json({ message: 'Error Intern' });
    }
  });

// Lista post pelo ID.
router.get('/:id',
  validateToken,
  async (req, res) => {
    try {
      const { id } = req.params;

      const post = await Posts.findOne({
        where: { id },
        include: { model: Users, as: 'user' },
        attributes: { exclude: ['userId'] },
      });

      if (!post) return res.status(404).json({ message: 'Post não existe' });

      return res.status(200).json(post);
    } catch (e) {
      console.error('getPostById', e.message);
      return res.status(500).json({ message: 'Error Intern' });
    }
  });

// Atualiza um post (somente dono do post);.
router.put('/:id',
  validateToken,
  titleRequired,
  contentRequired,
  postOwnerValidation,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;

      await Posts.update({ title, content }, { where: { id } });

      const updatedPost = await Posts.findOne({
        where: { id },
        attributes: { exclude: ['id', 'published', 'updated'] },
      });

      return res.status(200).json(updatedPost);
    } catch (e) {
      console.error('putPostById', e.message);
      return res.status(500).json({ message: 'Error Intern' });
    }
  });

module.exports = router;
