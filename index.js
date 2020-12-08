const express = require('express');
const bodyParse = require('body-parser');
const controller = require('./controllers');

const app = express();
const PORT = 3000;

app.use(bodyParse.json());

app.use('/user', controller.users);
app.use('/login', controller.login);
app.use('/post', controller.posts);

app.get('/', (_req, res) => res.send());
app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}!`));
