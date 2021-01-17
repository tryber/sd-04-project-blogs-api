const postsController = require('express').Router();
const { Op } = require('sequelize');
const { Posts, Users } = require('../models');
const validatePost = require('../middlewares/postValidation');
const { validateToken } = require('../authentication');

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

postsController.get('/search', validateToken, async (req, res) => {
  const { q: valueToSearch } = req.query;

  try {
    if (!valueToSearch) {
      const posts = await Posts.findAll({
        include: {
          model: Users,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        attributes: { exclude: ['userId'] },
      });
      return res.status(200).json(posts);
    }

    const filteredPosts = await Posts.findAll({
      include: {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      where: { [Op.or]: [{ title: valueToSearch }, { content: valueToSearch }] },
      attributes: { exclude: ['userId'] },
    });

    if (!filteredPosts) return res.status(200).json([]);

    return res.status(200).json(filteredPosts);
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

    if (post.dataValues.userId !== userId) {
      return res.status(401).json(createMessageJSON('Usuário não autorizado'));
    }
    await Posts.update({ title, content, userId }, { where: { id } });

    const updatedPost = await Posts.findByPk(id);

    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json(createMessageJSON('Opss... algo deu errado :/'));
  }
});

postsController.delete('/:id', validateToken, async (req, res) => {
  const {
    params: { id },
    user: { id: userId },
  } = req;
  try {
    const post = await Posts.findByPk(id);

    if (!post) return res.status(404).json(createMessageJSON('Post não existe'));

    if (post.dataValues.userId !== userId) {
      return res.status(401).json(createMessageJSON('Usuário não autorizado'));
    }

    await Posts.destroy({ where: { id, userId } });

    return res.sendStatus(204);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = postsController;
