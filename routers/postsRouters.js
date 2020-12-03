const express = require('express');

const {
  createPostController,
  getAllPostsController,
  getByIdController,
  putPostController,
  searchController,
  deletePostController,
} = require('../controllers/PostsController');
const { validationPosts } = require('../middlewares/validationPosts');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validationPosts, validateToken, createPostController);

router.get('/', validateToken, getAllPostsController);

router.get('/search', validateToken, searchController);

router.get('/:id', validateToken, getByIdController);

router.put('/:id', validationPosts, validateToken, putPostController);

router.delete('/:id', validateToken, deletePostController);

module.exports = router;
