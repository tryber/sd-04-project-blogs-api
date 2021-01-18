const express = require('express');
const boom = require('@hapi/boom');
const { usersController, loginController, postsController } = require('./controllers');

const PORT = 3000;
const app = express();
app.use(express.json());

app.use('/login', loginController);
app.use('/user', usersController);
app.use('/post', postsController);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

app.use((err, _req, res, _next) => {
  if (!boom.isBoom(err)) return res.status(500).send(`${err.message}`);

  res.status(err.output.statusCode).send(`${err.output.payload.message}`);
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
