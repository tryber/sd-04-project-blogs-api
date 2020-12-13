const express = require('express');
const { usersCreateVal, loginVal, auth } = require('./middlewares');
const users = require('./controllers/usersController');
// const posts = require('./controllers/postsController');
// const { tokenVal } = require('./middlewares/auth');

const router = express.Router();

router.post('/user', usersCreateVal, users.create);
router.post('/login', loginVal, users.login);
router.get('/user', auth.tokenVal, users.read);
router.get('/user/:id', auth.tokenVal, users.findById);
router.delete('/user/me', auth.tokenVal, users.del);

module.exports = router;
