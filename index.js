const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello World!'));

// Routes
app.use('/user', controller.user);
app.use('/post', controller.post);
app.use('/login', controller.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
