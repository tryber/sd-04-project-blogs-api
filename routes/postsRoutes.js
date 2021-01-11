const router = require('express').Router();
const auth = require('../auth');
const { posts } = require('../controllers');

router.get('/post/:id', auth, posts.getPostById);

router.get('/post', auth, posts.getAllPosts);

router.post('/post', auth, posts.newPost);

module.exports = router;
