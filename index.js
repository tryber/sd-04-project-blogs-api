require('dotenv').config();
const express = require('express');
const usersRoute = require('./routes/usersRoute');
const loginRoute = require('./routes/loginRoute');

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

// routes
app.use(express.json());

app.use('/user', usersRoute);
app.use('/login', loginRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
