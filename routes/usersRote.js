const { Router } = require('express');
const { usersController } = require('../controllers');
const middleware = require('../middlewares');

const usersRouter = Router();

usersRouter
  .get('/', middleware.authJWT, usersController.getAllUsersCont)
  .post('/', middleware.validateUser, usersController.createUserCont)
  .get('/:id', middleware.authJWT, usersController.getUserByIdCont)
  .delete('/me', middleware.authJWT, usersController.deleteUserByIdCont);

module.exports = {
  usersRouter,
};
