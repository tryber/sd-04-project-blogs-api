const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.use('/user', controllers.usersController);
app.use('/login', controllers.loginController);
app.use('/post', controllers.postsController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
