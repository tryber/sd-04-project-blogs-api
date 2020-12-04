const express = require('express');
const route = require('./routes');

const app = express();
app.use(express.json());

app.use('/user', route.userRouter);
app.use('/login', route.loginRouter);
app.use('/post', route.blogRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
