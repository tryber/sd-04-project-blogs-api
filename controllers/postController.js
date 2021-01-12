const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { Posts, Users } = require('../models');
const { dataPostValidation } = require('../services/postServices');
const usersWithouPass = require('../utils/userWithoutPass');

const router = express.Router();

router.get('/', authMiddleware, async (_req, res) => {
  try {
    const posts = await Posts.findAll();
    const users = await Users.findAll();
    const postUser = posts.map(({
      id,
      title,
      published,
      updated,
      content,
      userId,
    }) => {
      const user = users.filter((userFiltered) => userFiltered.id === userId);
      return ({ id,
        title,
        published,
        updated,
        content,
        user: usersWithouPass(user)[0],
      });
    });
    console.log(postUser);
    res.status(200).json(postUser);
  } catch (error) {
    res.status(500).send(`Um erro enesperado aconteceu:${error}`);
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id } });
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  const { title, published, updated, content, userId } = post;
  const user = await Users.findOne({ where: { id: userId } });
  return res.status(200).json({
    id: post.id,
    title,
    published,
    updated,
    content,
    user: usersWithouPass([user])[0] });
});

router.post('/', authMiddleware, dataPostValidation, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  const user = await Users.findOne({ where: { email } });
  await Posts.create({ title, content, userId: user.id });
  return res.status(201).json({ title, content, userId: user.id });
});

router.put('/:id', authMiddleware, dataPostValidation, async (req, res) => {
  const {
    body: { title, content },
    user: { email },
    params: { id },
  } = req;
  const post = await Posts.findOne({ where: { id } });
  const user = await Users.findOne({ where: { email } });
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (post.userId !== user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  await Posts.update({ where: { id } }, {
    title: title || post.title,
    content: content || post.content,
  });
  return res.status(201).json({
    title: title || post.title,
    content: content || post.content,
    userId: user.id });
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { email } = req.user;
  const user = await Users.findOne({ where: { email } });
  const post = await Posts.findOne({ where: { id } });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (post.userId !== user.id) {
    return res.status(401).json({ message: 'Usuário não autorizado' });
  }
  Posts.destroy({ where: { id } });
  return res.status(204).sendStatus(204);
});
module.exports = router;
