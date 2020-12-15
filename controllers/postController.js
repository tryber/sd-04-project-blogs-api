const { Router } = require('express');

const { Post } = require('../models');

const posts = Router();

posts.post('/', (req, res) => {
  const { title, content, userId } = req.body;

  Post.create({ title, content, userId })
    .then((newPost) => res.status(200).json(newPost))
    .catch((error) => console.log(error));
});

module.exports = posts;
