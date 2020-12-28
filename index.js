const express = require('express');

const Router = require('./routes');

const app = express();
app.use(express.json());

/** Router */
app.use('/user', Router.UserRouter);
app.use('/login', Router.LoginRouter);
app.use('/post', Router.PostRouter);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
