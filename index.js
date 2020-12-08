require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');

const controllers = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// ROTA PARA CONTROLAR USUARIOS!!
app.use('/user', controllers.users);

app.use('/login', controllers.login);

app.listen(PORT, () => console.log(`Listening PORT: ${PORT}`));
