const express = require('express');

const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');
const postsController = require('./controllers/postsController');

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// Rota de usuários
app.use('/user', usersController);

// Rota de login
app.use('/login', loginController);

// Rota de posts
app.use('/post', postsController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
