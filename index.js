const express = require('express');
const controllers = require('./controllers');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/user', controllers.UserControllers);

// app.listen(process.env.PORT, () => console.log(`ouvindo porta ${process.env.PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
