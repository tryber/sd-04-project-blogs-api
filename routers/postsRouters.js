const express = require('express');

const { createPostController, getAllPostsController } = require('../controllers/PostsController');
const { validationPosts } = require('../middlewares/validationPosts');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validationPosts, validateToken, createPostController);

router.get('/', validateToken, getAllPostsController);

module.exports = router;
