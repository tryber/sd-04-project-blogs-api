const router = require('express').Router();
const auth = require('../middlewares/auth');
const validation = require('../middlewares/validations');
const { Post } = require('../models');

router.post('/', validation.isPossibleInsertPost, auth, async (req, res) => {
  const { title, content } = req.body;
  try {
    const createdPost = await Post.create({
      title,
      content,
      userId: req.user.id,
    });
    const {
      dataValues: { updated, published, id, ...post },
    } = createdPost;
    return res.status(201).json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Algo errado!', err });
  }
});

module.exports = router;
