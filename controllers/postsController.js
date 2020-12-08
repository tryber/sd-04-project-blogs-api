const { Router } = require('express');
const { Posts, Users } = require('../models');
const validateToken = require('../services/validateToken');
const {
  titleRequired,
  contentRequired,
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

module.exports = router;
