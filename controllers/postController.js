const express = require('express');
const { authMiddleware } = require('../middlewares/auth');
const { Posts, Users } = require('../models');
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
  } catch (err) {
    res.status(500).send(`Um erro enesperado aconteceu:${err}`);
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).send(`Um erro enesperado aconteceu:${err}`);
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findOne({ where: { id } });
  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  if (post.userId !== req.user.id) {
    return res.status(401).json({ message: 'Ususário não autorizado' });
  }
  Posts.destroy({ where: { id } });
  return res.status(204).sendStatus(204);
});
module.exports = router;
