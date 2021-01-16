const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar

app.use(bodyParser.json());
app.get('/', (request, response) => {
  response.send('Conectado');
});

app.use('/user', controllers.users);
