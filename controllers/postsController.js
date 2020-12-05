const express = require('express');
const { Users, Posts } = require('../models');
const { validateToken } = require('../auth/validateToken');
const postsValidation = require('../middlewares/postsValidation');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postsValidation.validateTitle,
  postsValidation.validateContent,
  async (req, res) => {
    const { email } = req.user;

    const { title, content } = req.body;

    const user = await Users.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  },
);

router.get('/', validateToken, async (_req, res) => {
  const allPosts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(allPosts);
});

module.exports = router;
