require('dotenv').config();
const express = require('express');
const usersController = require('./controllers/usersController');
const loginController = require('./controllers/loginController');

const app = express();

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use(express.json());

app.use('/user', usersController);
app.use('/login', loginController);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
