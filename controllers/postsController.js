const express = require('express');
const { Op } = require('sequelize');
const { Posts, Users } = require('../models');
const postsValidation = require('../middlewares/postsValidation');
const validateToken = require('../auth/validateJWT');

const router = express.Router();

router.post(
  '/',
  validateToken,
  postsValidation.checkTitle,
  postsValidation.checkContent,
  async (req, res) => {
    const { email } = req.user;
    const { title, content } = req.body;

    const user = await Users.findOne({ where: { email } });
    const userId = user.dataValues.id;

    await Posts.create({ title, content, userId });
    return res.status(201).json({ title, content, userId });
  },
);

router.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;

  const posts = await Posts.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: `%${q}%`,
          },
        },
        {
          content: {
            [Op.like]: `%${q}%`,
          },
        },
      ],
    },
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  return res.status(200).json(posts);
});

router.get('/', validateToken, async (_req, res) => {
  const posts = await Posts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });
  return res.status(200).json(posts);
});

router.get('/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }

  return res.status(200).json(post);
});

router.put(
  '/:id',
  validateToken,
  postsValidation.checkTitle,
  postsValidation.checkContent,
  postsValidation.checkPostAuthor,
  async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const { userId } = req.user;

    await Posts.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId });
  },
);

module.exports = router;
