const { Router } = require('express');
const userController = require('./controllers/userController');
const { validateToken } = require('./middlewares/auth');

const routes = Router();

routes.post('/user', userController.newUser);
routes.post('/login', userController.login);
routes.get('/user', validateToken, userController.getUsers);

module.exports = routes;
