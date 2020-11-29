const { Router } = require('express');
const { createUserValid } = require('../middlewares');
const { userControllers } = require('../controllers');

const loginRouter = Router();

loginRouter.post(
  '/',
  createUserValid.passwordEmpty,
  createUserValid.passwordRequired,
  createUserValid.emailEmpty,
  createUserValid.emailRequired,
  userControllers.loginUser
);

module.exports = loginRouter;
