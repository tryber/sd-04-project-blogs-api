const express = require('express');
const encrypt = require('jsonwebtoken');
require('dotenv/config');
const { Post, User } = require('../models');

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

router.get('/', jwt.validateJWT, async (req, res) => {
  const posts = await Post.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });

  res.status(200).json(posts);
});

router.get('/:id', jwt.validateJWT, async (req, res) => {
  const post = await Post.findOne({
    where: { id: req.params.id },
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  res.status(200).json(post);
});

router.put('/:id', jwt.validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const decoded = encrypt.verify(token, process.env.SECRET);

  //  title validation
  if (!title) return res.status(400).json({ message: '"title" is required' });

  //  content validation
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const { userId } = await Post.findOne({
    where: { id: req.params.id },
  });

  //  usuário validation
  if (decoded.data.id !== userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  const editedPost = { title, content, userId: decoded.data.id };

  await Post.update(editedPost, { where: { id: req.params.id } });

  res.status(200).json(editedPost);
});

module.exports = router;
