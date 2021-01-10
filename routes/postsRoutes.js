const router = require('express').Router();
const auth = require('../auth');
const { posts } = require('../controllers');

router.post('/post', auth, posts.newPost);

module.exports = router;
