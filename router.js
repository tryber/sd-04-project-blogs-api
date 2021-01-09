const router = require('express').Router();

const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const userMiddleware = require('./middlewares/userMiddleware');
const postMiddleware = require('./middlewares/postMiddleware');
const authMiddleWare = require('./middlewares/authMiddleWare');

router.post('/login', userController.login);

router.post(
  '/user',
  userMiddleware.validateName,
  userMiddleware.validatePassword,
  userMiddleware.validateEmail,
  userController.insertNewUser,
);

router.get('/user', authMiddleWare.validateToken, userController.getAllUsers);

router.delete('/user/me', authMiddleWare.validateToken, userController.removeUser);

router.get('/user/:id', authMiddleWare.validateToken, userController.getUserById);

router.post(
  '/post',
  authMiddleWare.validateToken,
  postMiddleware.validateTitlePost,
  postMiddleware.validateContentPost,
  postController.createNewPost,
);

router.get('/post', authMiddleWare.validateToken, postController.getAllPosts);

router.get('/post/:id', authMiddleWare.validateToken, postController.getPostById);

router.delete('/post/:id', authMiddleWare.validateToken, postController.removePost);

router.put(
  '/post/:id',
  authMiddleWare.validateToken,
  postMiddleware.validateTitlePost,
  postMiddleware.validateContentPost,
  postController.updatePost,
);

module.exports = router;
