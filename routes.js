const { Router } = require('express');
const userController = require('./controllers/userController');

const routes = Router();

routes.post('/users', userController.newUser);

module.exports = routes;
