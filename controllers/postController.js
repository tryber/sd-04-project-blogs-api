const express = require('express');
const validateJwt = require('../middlewares/validateJwt');
const { Post, User } = require('../models');

const router = express.Router();
// https://sequelize.org/v5/manual/querying.html
router.get('/', validateJwt, async (req, res) => {
  const postsList = await Post.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: User, as: 'user' },
  });
  res.status(200).json(postsList);
});

module.exports = router;
