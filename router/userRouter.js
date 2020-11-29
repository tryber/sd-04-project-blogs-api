const { Router } = require('express');
const { createUserValid } = require('../middlewares');
const { validToken } = require('../service');
const { userControllers } = require('../controllers');

const userRouter = Router();

userRouter.post(
  '/',
  createUserValid.passwordRequired,
  createUserValid.emailRequired,
  createUserValid.passwordValid,
  createUserValid.emailValid,
  createUserValid.displayNameValid,
  userControllers.createUser
);

userRouter.get('/:id', validToken, userControllers.getUserById);

userRouter.get('/', validToken, userControllers.getAllUsers);

userRouter.delete('/me', validToken, userControllers.deleteUser);

module.exports = userRouter;
