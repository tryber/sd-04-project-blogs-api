const express = require('express');
const { userController } = require('../controllers');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/inputsValidation');

const router = express.Router();

router.post(
  '/',
  validateDisplayName,
  validateEmail,
  validatePassword,
  userController.createUser,
);

router.get('/', userController.getUser);

module.exports = router;
