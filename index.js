const express = require('express');
const rout = require('./router');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', rout.userRouter);
app.use('./login', rout.loginRouter);
app.use('./post', rout.postsRouter);
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// iniciando projeto
