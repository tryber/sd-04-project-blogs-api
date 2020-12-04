const express = require('express');
const { postController } = require('../controllers');
const {
  validatePostTitle,
  validatePostContent,
} = require('../middlewares/inputsValidation');
const tokenAuthorization = require('../middlewares/tokenAuthorization');

const router = express.Router();

router.post(
  '/',
  tokenAuthorization,
  validatePostTitle,
  validatePostContent,
  postController.createPost,
);

router.get('/search', tokenAuthorization, postController.searchPost);

router.get('/', tokenAuthorization, postController.getAllPosts);

router.get('/:id', tokenAuthorization, postController.getPostById);

router.put(
  '/:id',
  tokenAuthorization,
  validatePostTitle,
  validatePostContent,
  postController.updatePost,
);

router.delete('/:id', tokenAuthorization, postController.deletePost);

module.exports = router;
