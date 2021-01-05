const router = require('express').Router();

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const userMiddlewares = require('./middlewares/userMiddleware');
const authMiddleWare = require('./middlewares/authMiddleWare');

router.post('/login', userController.login);

router.post(
  '/user',
  userMiddlewares.validateName,
  userMiddlewares.validatePassword,
  userMiddlewares.validateEmail,
  userController.insertNewUser,
);

router.get('/user', authMiddleWare.validateToken, userController.getAllUsers);

router.get('/user/:id', authMiddleWare.validateToken, userController.getUserById);

router.delete('user/me', userController.removeUser);

router.post('/post', authMiddleWare.validateToken, postController.createNewPost);

router.get('/post', postController.getAllPosts);

module.exports = router;
