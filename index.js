const express = require('express');

const app = express();

const controllers = require('./controllers');

/*
Iniciando o projeto
OK - 1. migration - Uses, Posts
npx sequelize db:migrate
npx sequelize db:migrate:undo
OK - 2. seed (Aparentemente veio pronto)
OK - 3. models - User, Post
- 4. controllers - User
*/

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.user);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
