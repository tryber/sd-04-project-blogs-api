const router = require('express').Router();

const userController = require('./controllers/userController');
const userMiddlewares = require('./middlewares/userMiddleware');

const { Users } = require('./models/Users');

router.post(
  '/user',
  userMiddlewares.validateName,
  userMiddlewares.validatePassword,
  userMiddlewares.validateEmail,
  userController.insertNewUser,
);

router.get('/user', userController.getAllUsers);

router.post('/login', userController.login);

router.get('/', (req, res) => {
  res.send('Hello');
});

module.exports = router;
