const router = require('express').Router();
const auth = require('../auth');
const { posts } = require('../controllers');

router.delete('/post/:id', auth, posts.deletePost);

router.get('/post/:id', auth, posts.getPostById);

router.get('/post', auth, posts.getAllPosts);

router.post('/post', auth, posts.newPost);

router.put('/post/:id', auth, posts.editPost);

module.exports = router;
