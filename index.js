require('dotenv').config();
const express = require('express');

const { userRouter, loginRouter, postRouter } = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/post', postRouter);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
