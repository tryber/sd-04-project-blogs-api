const express = require('express');

const app = express();

const PORT = 3000;
// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.get('/user', (req, res) => {
  res.send('teste');
});

app.listen(PORT, () => console.log(`ouvidno na porta ${PORT}`));
