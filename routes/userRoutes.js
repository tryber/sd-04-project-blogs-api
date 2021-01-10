const router = require('express').Router();
const auth = require('../auth');
const { user } = require('../controllers');

router.post('/login', user.makeUserLoggedIn);

router.get('/user', auth, user.listAllUsers);

router.post('/user', user.newUser);

module.exports = router;
