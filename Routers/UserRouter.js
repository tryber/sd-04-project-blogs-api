const { Router } = require('express');
const { userController } = require('../controller');
const middlewares = require('../middlewares');

const userRouter = Router();

userRouter
  .post('/', middlewares.validateUsers, userController.createUserControl);

module.exports = userRouter;
