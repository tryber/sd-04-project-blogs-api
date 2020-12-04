const { Router } = require('express');
const middleware = require('../middlewares');
const { createPost, getAllPostsUser } = require('../controllers');

const blogRouter = Router();

blogRouter.post('/', middleware.validateBlog, middleware.authJWT, createPost);
blogRouter.get('/', middleware.authJWT, getAllPostsUser);

module.exports = blogRouter;
