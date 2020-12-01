const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes');
const controllers = require('./controllers');
const app = express();

app.use(express.json());
// app.use('/user', route.userRouter);
app.use('/users', controllers.users);

app.listen(3000, () => console.log('ouvindo na porta 3000!'));


// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
