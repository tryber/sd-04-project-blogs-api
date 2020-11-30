require('dotenv').config();
const express = require('express');
const controllers = require('./controllers');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const PORT = process.env.PORT || 3000;

app.use('/user', controllers.users);

app.use('/login', controllers.login);

app.listen(PORT, () => console.log(`Listening PORT: ${PORT}`));
