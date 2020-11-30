const { Router } = require('express');
const { validUser } = require('../middlewares');
const { userControllers } = require('../controllers');

const loginRouter = Router();

loginRouter.post(
  '/',
  validUser.passwordEmpty,
  validUser.passwordRequired,
  validUser.emailEmpty,
  validUser.emailRequired,
  userControllers.loginUser
);

module.exports = loginRouter;
