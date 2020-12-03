const { Router } = require('express');
const { postsController } = require('../controller');
const middleware = require('../middlewares');
const { validateToken } = require('../service');

const postsRouter = Router();

postsRouter
  .post('/', validateToken, middleware.validatePosts, postsController.createPostsControl);

module.exports = postsRouter;
