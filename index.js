const express = require('express');
const bodyParser = require('body-parser');
const { userController, loginController, postController } = require('./controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', userController);
app.use('/login', loginController);
app.use('/post', postController);
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
