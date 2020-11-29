const express = require('express');
const { Posts, Users } = require('../models');
const postsValidation = require('../middlewares/postsValidation');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postsValidation.checkTitle,
  postsValidation.checkContent,
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
  const posts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(posts);
});

module.exports = router;
