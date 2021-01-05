const express = require('express');
const controllers = require('./controllers');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/user', controllers.UsersControllers);
app.use('/login', controllers.LoginController);
app.use('/post', controllers.PostControllers);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const port = process.env.PORT;
app.listen(port, () => console.log(`ouvindo porta ${port}!`));
