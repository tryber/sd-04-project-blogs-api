const express = require('express');
const { usersController, loginController, postsController } = require('./controllers');

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/login', loginController);
app.use('/user', usersController);
app.use('/post', postsController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
