const express = require('express');
const bodyParser = require('body-parser');

const { usersController } = require('./controllers');
const { usersMiddlewares } = require('./middlewares');

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
  usersController.createUser,
);

app.post('/login',
  usersMiddlewares.verifyEmailLogin,
  usersMiddlewares.verifyPasswordLogin,
  usersController.login,
);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
