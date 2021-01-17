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

postsController.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Posts.findByPk(id, {
      include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
      attributes: { excludes: ['userId'] },
    });

    if (!post) return res.status(404).json(createMessageJSON('Post não existe'));

    return res.status(200).json(post);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

postsController.put('/:id', validateToken, validatePost, async (req, res) => {
  const {
    params: { id },
    body: { title, content },
    user: { id: userId },
  } = req;
  try {
    const post = await Posts.findByPk(id);

    if (!post) return res.status(404).json(createMessageJSON('Post não existe'));

    console.log(post.dataValues.userId !== userId);
    if (post.dataValues.userId !== userId) {
      return res.status(401).json(createMessageJSON('Usuário não autorizado'));
    }

    console.log('post', post);
    console.log('UPDATED');
    await Posts.update({ title, content, userId }, { where: { id } });
    const updatedPost = await Posts.findByPk(id);
    console.log('updatedPost', updatedPost);
    return res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

module.exports = postsController;
