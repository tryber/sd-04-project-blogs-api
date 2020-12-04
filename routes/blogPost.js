const { Router } = require('express');
const middleware = require('../middlewares');
const {
  createPost,
  getAllPostsUser,
  getPostById,
  deletePost,
} = require('../controllers');

const blogRouter = Router();

blogRouter.post('/', middleware.validateBlog, middleware.authJWT, createPost);
blogRouter.get('/', middleware.authJWT, getAllPostsUser);
blogRouter.get('/:id', middleware.authJWT, getPostById);
blogRouter.delete('/:id', middleware.authJWT, deletePost);

module.exports = blogRouter;
