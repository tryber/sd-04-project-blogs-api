const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const controllers = require('./controllers');

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.users);
app.use('/login', controllers.login);
app.use('/post', controllers.post);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
