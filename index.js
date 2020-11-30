const express = require('express');

const app = express();

app.listen(3000, () => console.log('ouvindo na porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
