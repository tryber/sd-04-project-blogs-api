const express = require('express');
const { Posts, User } = require('../models');
const middlewares = require('../middlewares');
const JWT = require('../service');

const router = express.Router();

router.post('/', JWT.validateJWT, middlewares.validadePosts, async (req, res) => {
  try {
    // console.log('email');
    const { title, content } = req.body;
    // console.log('log2');

    const { email } = req.user;
    // console.log('log3');
    const user = await User.findOne({ where: { email } });

    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });

    res.status(201).json({ title, content, userId });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Something wrong... create new post' });
  }
});

router.get('/', JWT.validateJWT, async (req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return res.status(200).json(posts);
});

router.get('/:id', JWT.validateJWT, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
});

router.put('/:id', JWT.validateJWT, middlewares.validadePosts, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { email } = req.user;

  const user = await User.findOne({ where: { email } });
  const post = await Posts.findOne({ where: { id } });

  if (user.dataValues.id !== post.dataValues.userId) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  const { userId } = post.dataValues;

  await Posts.update({ title, content }, { where: { id } });

  return res.status(200).json({ title, content, userId });
});

router.delete('/:id', JWT.validateJWT, async (req, res) => {
  const { id } = req.params;
  const { displayName } = req.user;
  const post = await Posts.findOne({ where: { id } });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  const user = await User.findOne({ where: { displayName } });

  if (post.userId !== user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }

  await User.destroy({ where: { id } });

  return res.status(204).json({ message: 'Post deletado' });
});

module.exports = router;
