const { Router } = require('express');
const { validateToken } = require('../auth');
const { Posts, Users } = require('../models');
const middlewares = require('../middlewares');

const postRouter = Router();

postRouter.delete('/me', validateToken, async (req, res) => {
  try {
    const { email } = req.user;

    await Posts.destroy({ where: { email } });

    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

postRouter.get('/', validateToken, async (_req, res) => {
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
    return res.status(500).json({ message: err });
  }
});

postRouter.get('/:id', validateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Posts.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não existe' });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

postRouter.post('/', validateToken, middlewares.postVal, async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.user;
    const newPost = await Posts.create({ title, content, userId: id });
    return res.status(201).json(newPost);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
});

module.exports = postRouter;
