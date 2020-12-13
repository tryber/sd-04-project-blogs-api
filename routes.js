const express = require('express');
const { usersCreateVal, loginVal, auth, postsCreateVal } = require('./middlewares');
const users = require('./controllers/usersController');
const posts = require('./controllers/postsController');

const router = express.Router();

router.post('/user', usersCreateVal, users.create);
router.post('/login', loginVal, users.login);
router.get('/user', auth.tokenVal, users.read);
router.get('/user/:id', auth.tokenVal, users.findById);
router.delete('/user/me', auth.tokenVal, users.del);

router.post('/post', auth.tokenVal, postsCreateVal, posts.create);
router.get('/post', auth.tokenVal, posts.read);
router.get('/post/:id', auth.tokenVal, posts.findById);
router.put('/post/:id', auth.tokenVal, postsCreateVal, posts.update);

module.exports = router;
