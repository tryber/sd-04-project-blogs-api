require('dotenv').config();
const express = require('express');
const route = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', route.usersRouter);
app.use('/login', route.loginRouter);
app.use('/post', route.postsRouter);

app.use((error, _req, res, _next) => {
  const { message, status } = error;
  if (status < 500) {
    return res.status(status).json(message);
  }
  res.status(500).send({ message });
});

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
