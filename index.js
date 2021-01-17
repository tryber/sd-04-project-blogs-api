const express = require('express');
const usersController = require('./controller/userController');
const loginController = require('./controller/loginController');
const postsController = require('./controller/postsController');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', usersController);
app.use('/login', loginController);
app.use('/post', postsController);
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// iniciando projeto
