const { Router } = require('express');
const { userController } = require('../controller');
const middlewares = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', middlewares.loginValidation, userController.loginControl);

module.exports = loginRouter;
