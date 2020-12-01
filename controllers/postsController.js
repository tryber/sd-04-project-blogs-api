const router = require('express').Router();
const rescue = require('express-rescue');
const { validateToken, validate } = require('../middlewares');
const { Posts, Users } = require('../models');

const newPost = rescue(async (req, res) => {
  const postInfo = { ...req.body, userId: req.user.id };
  const { dataValues } = await Posts.create(postInfo);
  res.status(201).json(dataValues);
});

const getAllPosts = rescue(async (_req, res) => {
  try {
    const postsList = await Posts.findAll({
      attributes: { exclude: ['userId'] },
      include: { model: Users, as: 'user' },
    });
    res.json(postsList);
  } catch (error) {
    console.log(error);
  }
});

router.post('/', validateToken, validate('post'), newPost);

router.get('/', validateToken, getAllPosts);

module.exports = router;
