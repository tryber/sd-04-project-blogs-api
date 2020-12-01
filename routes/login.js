const { Router } = require('express');
const { loginUser } = require('../controllers');
const { verifyLogin } = require('../services');
const middleware = require('../middlewares');

const loginRouter = Router();

loginRouter.post('/', middleware.validateUser, verifyLogin, loginUser);

module.exports = loginRouter;
