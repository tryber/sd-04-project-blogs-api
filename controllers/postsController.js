const router = require('express').Router();
const rescue = require('express-rescue');
const { Op } = require('sequelize');
const { POST_NOT_FOUND, USER_NOT_ALLOWED } = require('../errors');
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

const updatePost = rescue(async (req, res) => {
  const { params: { id }, user, body } = req;
  const postInfo = { ...body, userId: user.id };
  const result = await Posts.update(body, { where: { id, userId: user.id } });
  if (!result[0]) throw USER_NOT_ALLOWED;
  res.json(postInfo);
});

const searchPost = rescue(async (req, res) => {
  const { q } = req.query;
  const postsList = await Posts.findAll({
    attributes: { exclude: ['userId'] },
    where: { [Op.or]: [{ title: { [Op.substring]: q } }, { content: { [Op.substring]: q } }] },
    include: [{ model: Users, as: 'user' }],
  });
  res.json(postsList);
});

const deletePost = rescue(async (req, res) => {
  const { params: { id }, user } = req;
  const result = await Posts.findByPk(id);
  if (!result) throw POST_NOT_FOUND;
  if (result.dataValues.userId !== user.id) throw USER_NOT_ALLOWED;
  await Posts.destroy({ where: { id } });
  res.status(204).send();
});

router.post('/', validateToken, validate('post'), newPost);

router.get('/', validateToken, getAllPosts);

router.get('/search', validateToken, searchPost);

router.get('/:id', validateToken, getPostById);

router.put('/:id', validateToken, validate('post'), updatePost);

router.delete('/:id', validateToken, deletePost);

module.exports = router;
