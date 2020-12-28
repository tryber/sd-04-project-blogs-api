const { Router } = require('express');
const Controllers = require('../controllers');

const router = Router();

const { validateLogin } = require('../Middlewares');

router.post('/', validateLogin, Controllers.LoginController.login);

module.exports = router;
