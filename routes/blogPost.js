const { Router } = require('express');
const middleware = require('../middlewares');
const { createPost, getAllPostsUser, getPostById } = require('../controllers');

const blogRouter = Router();

blogRouter.post('/', middleware.validateBlog, middleware.authJWT, createPost);
blogRouter.get('/', middleware.authJWT, getAllPostsUser);
blogRouter.get('/:id', middleware.authJWT, getPostById);

module.exports = blogRouter;
