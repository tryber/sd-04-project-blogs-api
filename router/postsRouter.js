const { Router } = require('express');
const { postsController } = require('../controller');
const middleware = require('../middlewares');
const { tokenValidation } = require('../service');

const postsRouter = Router();

postsRouter.post('/', tokenValidation, middleware.postsValidation, postsController.postsCreate);
postsRouter.get('/', tokenValidation, postsController.findAllPostControl);
postsRouter.get('/:id', tokenValidation, postsController.findPostById);
postsRouter.put('/:id', tokenValidation, middleware.postsValidation, postsController.updatePost);

module.exports = postsRouter;
