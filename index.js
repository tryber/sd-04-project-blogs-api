const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const routes = require('./routes');

app.use('/login', routes.authenticateRouter);
app.use('/user', routes.userRouter);
app.use('/post', routes.postRouter);

app.use((err, _req, res, _next) => {
  console.log(err);
  res.status(err.status || 400).json({ message: err.message });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
