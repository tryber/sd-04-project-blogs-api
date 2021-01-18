const router = require('express').Router();
const { validateToken } = require('../services/auth');

const { Posts, Users } = require('../models');
const verifyFields = require('../middlewares/postsValidation');

router.post('/', validateToken, verifyFields, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const newPost = await Posts.create({ title, content, userId: id });
    return res.status(201).json(newPost);
  } catch (_err) {
    return res.status(500).json({ message: 'algo deu errado' });
  }
});

router.get('/', validateToken, async (_req, res) => {
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
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});
module.exports = router;
