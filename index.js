const express = require('express');
const userController = require('./controllers/userController');
const loginController = require('./controllers/loginController');
const postController = require('./controllers/postController');

const app = express();

app.use(express.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postController);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
