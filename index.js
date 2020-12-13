const express = require('express');
const routes = require('./routes');
const errors = require('./middlewares/errors');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());
app.use(routes);
app.use('*', errors.notFound);
app.use(errors.internal);

app.listen(3000, () => console.log('ouvindo porta 3000!'));
