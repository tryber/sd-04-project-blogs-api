const express = require('express');
const { usersController, loginController, postsController } = require('./controllers');

const app = express();
app.use(express.json());

app.use('/login', loginController);
app.use('/user', usersController);
app.use('/post', postsController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
