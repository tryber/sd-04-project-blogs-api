const { Router } = require('express');
const { userController: { loginUserController } } = require('../controllers');
const { userMiddlewares: {
  validateEmail,
  validateEmailEmpty,
  validateEmailRegex,
  validatePassword,
  validatePasswordEmpty,
  validatePasswordSize,
},
} = require('../middlewares');
const {
  EMAIL_FIELD,
  EMAIL_EMPTY,
  EMAIL_REGEX,
  PASSWORD_FIELD,
  PASSWORD_EMPTY,
  PASSWORD_SIZE,
} = require('../utils/errorTypes');

const loginRouter = Router();

loginRouter.post('/',
  validateEmail(400, EMAIL_FIELD),
  validateEmailEmpty(400, EMAIL_EMPTY),
  validateEmailRegex(400, EMAIL_REGEX),
  validatePassword(400, PASSWORD_FIELD),
  validatePasswordEmpty(400, PASSWORD_EMPTY),
  validatePasswordSize(400, PASSWORD_SIZE),
  loginUserController);

module.exports = loginRouter;
