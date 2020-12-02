const express = require('express');

const router = express.Router();

const UsersController = require('../controllers/UsersController');
const { validationLogin, checkIfEmailExist } = require('../middlewares/validationLogin');

router.post('/', validationLogin, checkIfEmailExist, UsersController.loginController);

module.exports = router;
