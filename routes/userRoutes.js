const router = require('express').Router();
const { user } = require('../controllers');

router.post('/login', user.makeUserLoggedIn);

router.post('/user', user.newUser);

module.exports = router;
