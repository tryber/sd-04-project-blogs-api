const postsController = require('express').Router();
const { Posts } = require('../models');
const validatePost = require('../middlewares/postValidation');
const { validateToken } = require('../authentication');

postsController.post('/', validateToken, validatePost, async (req, res) => {
  try {
    const {
      body: { title, content },
      user: { id: userId },
    } = req;

    const createdPost = await Posts.create({ title, content, userId });
    return res.status(201).json(createdPost);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json('Opss... algo deu errado :/');
  }
});

module.exports = postsController;
