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

module.exports = router;
