const { Router } = require('express');
const { postsController } = require('../controllers');
const middleware = require('../middlewares');

const postsRouter = Router();

postsRouter
  .get('/', middleware.authJWT, postsController.getAllPostsCont)
  .post('/', middleware.authJWT, middleware.validatePost, postsController.createPostsCont)
  .get('/:id', middleware.authJWT, postsController.getPostByIdCont)
  .put('/:id', middleware.authJWT, middleware.validatePost, postsController.updatePostCont)
  .delete('/:id', middleware.authJWT, postsController.deletePostCont);

module.exports = {
  postsRouter,
};
