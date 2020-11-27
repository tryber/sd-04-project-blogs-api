require('dotenv').config();
const express = require('express');
const usersController = require('./controllers/usersController');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', usersController);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
