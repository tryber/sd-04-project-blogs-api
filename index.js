const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/*
Iniciando o projeto
OK - 1. migration - Uses, Posts
npx sequelize db:migrate
npx sequelize db:migrate:undo
OK - 2. seed (Aparentemente veio pronto)
npx sequelize-cli db:seed:all
OK - 3. models - User, Post
- 4. controllers - User
*/

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.user);
app.use('/login', controllers.login);
app.use('/post', controllers.post);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
