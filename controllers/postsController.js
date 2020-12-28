const express = require('express');
const { Posts, User } = require('../models');
const { validate } = require('../middlewares/auth');
const { postCreateMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', validate, postCreateMiddleware, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;

  await Posts.create({ title, content , userId});

  return res.status(201).json({ title, content, userId });
});

router.get('/', validate, async (req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return res.status(200).json(posts);
});

router.get('/:id', validate, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post);
});

router.put('/:id', validate, postCreateMiddleware, async (req, res) => {
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

router.delete('/:id', validate, async (req, res) => {
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
