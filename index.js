require('dotenv').config();
const express = require('express');
const usersControllers = require('./controllers/usersController');

const app = express();
app.use(express.json());

// evaluator forever
app.use('/user', usersControllers);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
