const { Router } = require('express');
const { usersController } = require('../controllers');

const usersRouter = Router();

usersRouter.get('/', usersController.getAllUsersCont);

module.exports = {
  usersRouter,
};
