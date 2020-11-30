const { Router } = require('express');

const { validPost, verifyPostBelonging } = require('../middlewares');
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

postRouter.get('/', validToken, postControllers.getAllPosts);

postRouter.delete('/:id', validToken, verifyPostBelonging, postControllers.deletePostById);

postRouter.get('/:id', validToken, postControllers.getPostById);

postRouter.put(
  '/:id',
  validToken,
  verifyPostBelonging,
  validPost.contentRequired,
  validPost.titleRequired,
  postControllers.updatePostById
);

module.exports = postRouter;
