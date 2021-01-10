const router = require('express').Router();
const auth = require('../auth');
const { user } = require('../controllers');

router.delete('/user/me', auth, user.deleteUser);

router.post('/login', user.makeUserLoggedIn);

router.get('/user', auth, user.listAllUsers);

router.get('/user/:id', auth, user.getOneUser);

router.post('/user', user.newUser);

module.exports = router;
