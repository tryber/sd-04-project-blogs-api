require('dotenv/config');
const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.userRouter);
app.use('/login', routes.loginRouter);
app.use('/post', routes.postRouter);

app.listen(port, () => console.log(`Listening on port ${port}`));
