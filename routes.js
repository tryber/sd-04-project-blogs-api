const express = require('express');
const { usersCreateVal, loginVal } = require('./middlewares');
const users = require('./controllers/usersController');
// const posts = require('./controllers/postsController');
// const { tokenVal } = require('./middlewares/auth');

const router = express.Router();

router.post('/user', usersCreateVal, users.create);
router.post('/login', loginVal, users.login);

module.exports = router;
