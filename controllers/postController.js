const express = require('express');
const validatejwt = require('../auth/validatejwt');
const { Posts } = require('../models');

const postRoute = express.Router();

postRoute.post('/', validatejwt, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const published = new Date();
    const updated = new Date();
    if (!title || !content) {
      const msg = title ? '"content" is required' : '"title" is required';
      return res.status(400).json({ message: msg });
    }
    console.log('quinto');
    const newPost = await Posts.create({ title, content, userId: id, published, updated });
    console.log('newPost', newPost.dataValues);
    return res.status(201).json(newPost.dataValues);
  } catch (error) {
    console.log('errorr');

    return res.status(409).json({ message: 'algo deu errado' });
  }
});

module.exports = postRoute;
