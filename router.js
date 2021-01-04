const router = require('express').Router();

const userController = require('./controllers/userController');
const userMiddlewares = require('./middlewares/userMiddleware');
// const authMiddleWare = require('./middlewares/authMiddleWare');

router.post(
  '/user',
  userMiddlewares.validateName,
  userMiddlewares.validatePassword,
  userMiddlewares.validateEmail,
  userController.insertNewUser,
);

router.get('/user', userController.getAllUsers);

router.post('/login', userController.login);

module.exports = router;
