const router = require('express').Router();
const { validateToken } = require('../services/auth');

const { Posts } = require('../models');
const verifyFields = require('../middlewares/postsValidations');

router.post('/',
  validateToken,
  verifyFields,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.user;
      const newPost = await Posts.create({ title, content, userId: id });
      return res.status(201).json(newPost);
    } catch (_err) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  });
module.exports = router;
