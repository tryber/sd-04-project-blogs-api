const { Router } = require('express');
const { userController: {
  createUserController,
  getAllUsersController,
  getUserController,
} } = require('../controllers');
const { tokenAuth, userMiddlewares: {
  validateName,
  validateEmail,
  validateEmailRegex,
  validatePassword,
  validatePasswordSize,
},
} = require('../middlewares');
const {
  NAME_LENGTH,
  EMAIL_FIELD,
  EMAIL_REGEX,
  PASSWORD_FIELD,
  PASSWORD_SIZE,
} = require('../utils/errorTypes');

const userRouter = Router();

userRouter.post('/',
  validateName(400, NAME_LENGTH),
  validateEmail(400, EMAIL_FIELD),
  validateEmailRegex(400, EMAIL_REGEX),
  validatePassword(400, PASSWORD_FIELD),
  validatePasswordSize(400, PASSWORD_SIZE),
  createUserController);

userRouter.get('/', tokenAuth, getAllUsersController);
userRouter.get('/:id', tokenAuth, getUserController);

module.exports = userRouter;
