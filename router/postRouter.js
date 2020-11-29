const { Router } = require('express');

const { validPost } = require('../middlewares');
const { validToken } = require('../service');
const { postControllers } = require('../controllers');

const postRouter = Router();

postRouter.post(
  '/',
  validToken,
  validPost.contentRequired,
  validPost.titleRequired,
  postControllers.createPosts
);

module.exports = postRouter;
