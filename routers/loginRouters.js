const express = require('express');

const router = express.Router();

// eslint-disable-next-line import/no-unresolved
const UsersController = require('../controllers/UsersController');
const { validationLogin, checkIfEmailExist } = require('../middlewares/validationLogin');

router.post('/', validationLogin, checkIfEmailExist, UsersController.loginController);

module.exports = router;
