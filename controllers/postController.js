const { Router } = require('express');
const validateJWT = require('../auth/validateJWT');
const { Posts, Users } = require('../models');

const router = Router();

router.post('/', validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const { data } = req.user;

  if (!title) {
    res.status(400).json({ message: '"title" is required' });
  }

  if (!content) {
    res.status(400).json({ message: '"content" is required' });
  }

  const user = await Users.findOne({ where: { displayName: data } });
  const { id } = user;
  const posts = await Posts.create({ title, content, userId: id });

  res.status(201).json(posts);
});

router.get('/', validateJWT, async (req, res) => {
  const posts = await Posts.findAll({
    attributes: { exclude: ['userId'] },
    include: [
      {
        model: Users,
        as: 'user',
      },
    ],
  });
  res.status(200).json(posts);
});
module.exports = router;
