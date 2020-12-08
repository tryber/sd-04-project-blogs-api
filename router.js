const routes = require('express').Router();

routes.post('/', (req, res) => {
  const { user } = req.body;
  const token = 0;
  return res.status(201).json(token, user);
});

routes.get('/', (_req, res) => {
  res.send('Hello Henrique');
});

module.exports = routes;
