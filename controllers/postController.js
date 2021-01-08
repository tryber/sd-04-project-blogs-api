const express = require('express');
const validatejwt = require('../auth/validatejwt');
const { Post } = require('../models');

const postRoute = express.Router();

postRoute.post('/', validatejwt, async (req, res) => {
  try {
    console.log('primeiro');
    const { title, content } = req.body;
    console.log('segundo');

    if (!title || !content) {
      console.log('terceiro');

      const msg = title ? '"content" is required' : '"title" is required';
      console.log('quarto');

      return res.status(405).json({ message: msg });
    }
    console.log('quinto');

    const newPost = await Post.create({ title, content });
    console.log('newPost', newPost);
    return res.status(200).json({ m: 'oi' });
  } catch (error) {
    console.log('errorr');

    res.status(409).json({ message: 'algo deu errado' });
  }
});

module.exports = postRoute;
