const express = require('express');

const { createPostController } = require('../controllers/PostsController');
const { validationPosts } = require('../middlewares/validationPosts');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validationPosts, validateToken, createPostController);

module.exports = router;
