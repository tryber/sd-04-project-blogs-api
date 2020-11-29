const { Router } = require('express');
const { validUser } = require('../middlewares');
const { validToken } = require('../service');
const { userControllers } = require('../controllers');

const userRouter = Router();

userRouter.post(
  '/',
  validUser.passwordRequired,
  validUser.emailRequired,
  validUser.passwordValid,
  validUser.emailValid,
  validUser.displayNameValid,
  userControllers.createUser
);

userRouter.get('/:id', validToken, userControllers.getUserById);

userRouter.get('/', validToken, userControllers.getAllUsers);

userRouter.delete('/me', validToken, userControllers.deleteUser);

module.exports = userRouter;
