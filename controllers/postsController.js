const postsController = require('express').Router();
const { Posts, Users } = require('../models');
const validatePost = require('../middlewares/postValidation');
const { validateToken } = require('../authentication');
const { usersController } = require('.');

const createMessageJSON = (message) => ({ message });

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
    return res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

postsController.get('/', validateToken, async (_req, res) => {
  try {
    const posts = await Posts.findAll({
      include: {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });
    return res.status(200).json(posts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

module.exports = postsController;
