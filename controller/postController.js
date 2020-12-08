const express = require('express');
const { Posts, Users } = require('../models');
const JWT = require('../service');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', JWT.validateJWT, middlewares.validadePosts, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const user = await Users.findOne({ where: { email } });
  const post = await Posts.create({ userId: user.id, title, content });

  return res.status(201).json({
    title: post.title,
    content: post.content,
    userId: post.userId,
  });
});

module.exports = router;
