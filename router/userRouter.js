const { Router } = require('express');
const { createUserValid } = require('../middlewares');
const { userControllers } = require('../controllers');

const userRouter = Router();

userRouter.post(
  '/',
  async (req, res, next) => {
    console.log('body', req.body);
    next();
  },
  createUserValid.passwordRequired,
  createUserValid.emailRequired,
  createUserValid.passwordValid,
  createUserValid.emailValid,
  createUserValid.displayNameValid,
  userControllers.createUser
);

module.exports = userRouter;
