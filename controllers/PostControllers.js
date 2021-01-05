const express = require('express');
const { Posts, Users } = require('../models');
const { authentication } = require('../middlewares/tokenValidation');

const router = express.Router();

router.get('/', authentication, async (req, res) => {
  const blogPosts = await Posts.findAll();
  return res.status(200).json(blogPosts);
});

router.post('/', authentication, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user.dataValues;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const user = await Users.findOne({ where: { email } });
  const data = {
    title,
    content,
    userId: user.dataValues.id,
  };
  await Posts.create(data);
  return res.status(201).json(data);
});

router.get('/:id', authentication, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findAll({
    where: { id },
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: Users,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
    ],
  });
  if (!post[0]) return res.status(404).json({ message: 'Post não existe' });

  return res.status(200).json(post[0]);
});

router.put('/:id', authentication, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userReqId = req.user.dataValues.id;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  const post = await Posts.findOne({ where: { id } });
  if (post.userId !== userReqId) return res.status(401).json({ message: 'Usuário não autorizado' });

  await Posts.update({ title, content }, { where: { id } });
  return res.status(200).json({ title, content, userId: userReqId });
});

router.delete('/:id', authentication, async (req, res) => {
  const { id } = req.params;
  const userReqId = req.user.dataValues.id;

  const post = await Posts.findOne({ where: { id } });
  if (!post) return res.status(404).json({ message: 'Post não existe' });
  if (post.userId !== userReqId) return res.status(401).json({ message: 'Usuário não autorizado' });

  await Posts.destroy({ where: { id } });
  return res.status(204).json();
});

module.exports = router;
