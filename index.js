const express = require('express');

const app = express();

app.listen(3000, () => console.log('ouvindo porta 3000!'));

/*
Iniciando o projeto

1. migration
OK - 2. seed (Aparentemente veio pronto)
3. models
4. controllers
*/

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
