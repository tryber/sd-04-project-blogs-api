const { Router } = require('express');
const { userController } = require('../controller');
const { tokenValidation } = require('../service');
const middlewares = require('../middlewares');

const userRouter = Router();

userRouter.get('/', tokenValidation, userController.findAllUser);
userRouter.get('/:id', tokenValidation, userController.findUserId);
userRouter.delete('/me', tokenValidation, userController.deleteUser);
userRouter.post('/', middlewares.userValidation, userController.createUser);

module.exports = userRouter;
