const express = require('express');
const encrypt = require('jsonwebtoken');
require('dotenv/config');
const { Post } = require('../models');

const router = express.Router();
const jwt = require('../middlewares/auth');

router.post('/', jwt.validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, process.env.SECRET);

  //  title validation
  if (!title) return res.status(400).json({ message: '"title" is required' });

  //  content validation
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const newPost = { title, content, userId: decoded.data.id };

  await Post.create(newPost);

  res.status(201).json(newPost);
});

module.exports = router;
