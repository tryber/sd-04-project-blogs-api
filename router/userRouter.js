const { Router } = require('express');
const { createUserValid } = require('../middlewares');
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

module.exports = userRouter;
