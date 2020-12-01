const router = require('express').Router();
const rescue = require('express-rescue');
const { POST_NOT_FOUND } = require('../errors');
const { validateToken, validate } = require('../middlewares');
const { Posts, Users } = require('../models');

const newPost = rescue(async (req, res) => {
  const postInfo = { ...req.body, userId: req.user.id };
  const { dataValues } = await Posts.create(postInfo);
  res.status(201).json(dataValues);
});

const getAllPosts = rescue(async (_req, res) => {
  const postsList = await Posts.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: Users, as: 'user' },
  });
  res.json(postsList);
});

const getPostById = rescue(async (req, res) => {
  const { id } = req.params;
  const post = await Posts.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: { model: Users, as: 'user' },
  });
  if (!post) throw POST_NOT_FOUND;
  res.json(post);
});

router.post('/', validateToken, validate('post'), newPost);

router.get('/', validateToken, getAllPosts);

router.get('/:id', validateToken, getPostById);

module.exports = router;
