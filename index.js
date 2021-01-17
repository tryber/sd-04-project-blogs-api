const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

const PORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.users);

app.use('/login', controllers.login);

app.listen(PORT, () => console.log(`Hey, listen! ${PORT}`));
