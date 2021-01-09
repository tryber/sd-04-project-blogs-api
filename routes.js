const { Router } = require('express');
const postController = require('./controllers/postController');
const userController = require('./controllers/userController');
const { validateToken } = require('./middlewares/auth');

const routes = Router();

routes.post('/user', userController.newUser);
routes.post('/login', userController.login);
routes.get('/user', validateToken, userController.getUsers);
routes.get('/user/:id', validateToken, userController.findUserById);
routes.delete('/user/me', validateToken, userController.deleteUser);
routes.post('/post', validateToken, postController.newPost);
routes.get('/post', validateToken, postController.getPosts);
routes.get('/post/:id', validateToken, postController.findPostById);

module.exports = routes;
