const { Router } = require('express');
const { userController } = require('../controller');
const { validateToken } = require('../service');
const middlewares = require('../middlewares');

const userRouter = Router();

userRouter
  .post('/', middlewares.validateUsers, userController.createUserControl)
  .get('/', validateToken, userController.getAllUserControl);

module.exports = userRouter;
