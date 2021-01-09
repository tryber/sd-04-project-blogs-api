const express = require('express');
const validatejwt = require('../auth/validatejwt');
const { Posts, Users } = require('../models');

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
    const newPost = await Posts.create({ title, content, userId: id, published, updated });
    return res.status(201).json(newPost.dataValues);
  } catch (error) {
    return res.status(400).json({ message: 'algo deu errado' });
  }
});

postRoute.get('/', validatejwt, async (req, res) => {
  try {
    console.log('teste1');
    const posts = await Posts.findAll({
      include: [{
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      }],
      attributes: { exclude: ['userId'] },
    });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message: 'algo deu errado' });
  }
});

module.exports = postRoute;
