const express = require('express');
const controllers = require('./controllers');
const middlewares = require('./middlewares');

const app = express();
app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', middlewares.userVal, controllers.users);
app.post('/login', middlewares.userVal, controllers.login);
