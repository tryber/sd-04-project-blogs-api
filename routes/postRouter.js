const { Router } = require('express');
const { postController: { createPostController, getAllPostsController, getPostController } } = require('../controllers');
const { tokenAuth, postMiddlewares: {
  validateTitle,
  validateContent,
} } = require('../middlewares');
const {
  TITLE_FIELD,
  CONTENT_FIELD,
} = require('../utils/errorTypes');

const postRouter = Router();

postRouter.post('/',
  tokenAuth,
  validateTitle(400, TITLE_FIELD),
  validateContent(400, CONTENT_FIELD),
  createPostController);

postRouter.get('/', tokenAuth, getAllPostsController);
postRouter.get('/:id', tokenAuth, getPostController);

module.exports = postRouter;
