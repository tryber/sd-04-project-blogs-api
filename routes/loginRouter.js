const express = require('express');
const { loginController } = require('../controllers');
const {
  validateEmail,
  validatePassword,
} = require('../middlewares/inputsValidation');

const router = express.Router();

router.post('/', validateEmail, validatePassword, loginController.login);

module.exports = router;
