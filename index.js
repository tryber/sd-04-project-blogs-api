const express = require('express');

const app = express();

const router = require('./router.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.listen(3000, () => console.log('ouvindo porta 3000!'));
