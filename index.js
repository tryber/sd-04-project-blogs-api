const express = require('express');
const bodyParse = require('body-parser');

const userRouter = require('./routers/userRouters');

const app = express();
const PORT = 3000;

app.use(bodyParse.json());

app.use('/user', userRouter);

app.get('/', (_req, res) => res.send());
app.listen(PORT, () => console.log(`ouvindo na porta ${PORT}!`));
