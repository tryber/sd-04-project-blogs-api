const { Router } = require('express');
const userController = require('./controllers/userController');

const routes = Router();

routes.post('/user', userController.newUser);

module.exports = routes;
