const bodyParser = require('body-parser');

const express = require('express');

const { userController } = require('./controllers');

const app = express();

app.use(bodyParser.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));
app.use('/user', userController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
