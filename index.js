const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

const app = express();

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar

app.use(bodyParser.json());
app.get('/', (request, response) => {
  response.send();
});

app.use('/login', controllers.login);
app.use('/user', controllers.user);
app.use('/post', controllers.blogPost);

app.listen(PORT, () => console.log(`ouvidno na porta ${PORT}....`));
