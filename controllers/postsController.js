const router = require('express').Router();
const rescue = require('express-rescue');
const { validateToken, validate } = require('../middlewares');
const { Posts } = require('../models');

const newPost = rescue(async (req, res) => {
  const postInfo = { ...req.body, userId: req.user.id };
  const { dataValues } = await Posts.create(postInfo);
  res.status(201).json(dataValues);
});

router.post('/', validateToken, validate('post'), newPost);

module.exports = router;
