const express = require('express');
const bodyParser = require('body-parser');

const {
  usersController,
  postsController,
} = require('./controllers');
const {
  usersMiddlewares,
  postsMiddlewares,
} = require('./middlewares');
const { auth } = require('./services');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.post('/user',
  usersMiddlewares.verifyDisplayNameCreate,
  usersMiddlewares.verifyEmailCreate,
  usersMiddlewares.verifyPasswordCreate,
  usersController.createUser);

app.post('/login',
  usersMiddlewares.verifyEmailLogin,
  usersMiddlewares.verifyPasswordLogin,
  usersController.login);

app.get('/user', auth, usersController.getAll);

app.get('/user/:id', auth, usersController.getById);

app.delete('/user/me', auth, usersController.excludeById);

app.post('/post',
  auth,
  postsMiddlewares.verifyTitleExist,
  postsMiddlewares.verifyContentExist,
  postsController.createPost);

app.get('/post/search?q=:searchTerm',
  auth,
  postsController.searchPost);

app.get('/post',
  auth,
  postsController.getAll);

app.get('/post/:id',
  auth,
  postsController.getById);

/* app.put('/post/:id',
  auth,
  postsMiddlewares.verifyTitleExist,
  postsMiddlewares.verifyContentExist,
  postsController.updateById); */

app.delete('/post/:id',
  auth,
  postsController.excludeById);


app.listen(3000, () => console.log('ouvindo porta 3000!'));
