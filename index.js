const express = require('express');

const controllers = require('./controller');

const app = express();
const port = process.env.PORT || 3000;

app.use('/user', controllers.userController);
app.use('/login', controllers.loginController);
app.use('/post', controllers.postController);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Listening on ${port}`));
