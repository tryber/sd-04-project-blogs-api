const express = require('express');
const controllers = require('./controllers');

const app = express();

app.use(express.json());

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', controllers.users.router);

app.post('/login', controllers.users.postLogin);

app.use(({ code = 400, message = 'Unknown error' }, _req, res, _next) => res.status(code).json({ message }));
