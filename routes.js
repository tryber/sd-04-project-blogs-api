const { Router } = require('express');
const userController = require('./controllers/userController');

const routes = Router();

routes.post('/user', userController.newUser);
routes.post('/login', userController.login);

module.exports = routes;
