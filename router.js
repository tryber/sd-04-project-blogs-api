const router = require('express').Router();

const userController = require('./controllers/userController');

router.post('/', userController.insertNewUser);

router.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = router;
