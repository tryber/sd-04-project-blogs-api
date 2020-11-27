const { Router } = require('express');
const { usersController } = require('../controllers');
const middleware = require('../middlewares');

const usersRouter = Router();

usersRouter.get('/', middleware.authJWT, usersController.getAllUsersCont);

module.exports = {
  usersRouter,
};
