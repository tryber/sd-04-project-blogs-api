const express = require('express');
const { Post, User } = require('../models');
const validateToken = require('../auth/validateToken');
const postsValidation = require('../services/postsValidation');

const postsRouter = express.Router();

// POST PARA CRIAR UM USUARIO NO BANCO
postsRouter.post('/', validateToken, async (req, res) => {
  try {
    const { title, content } = req.body;
    postsValidation({ ...req.body }, res);
    const { id } = req.user;
    const createPost = await Post.create({ title, content, userId: id });
    const { id: _, ...newPost } = createPost.dataValues;
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

postsRouter.get('/', validateToken, async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{ model: User, as: 'users', attributes: { exclude: ['password'] } }],
    });
    res.status(201).json(allPosts);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = postsRouter;
