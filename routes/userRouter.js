const express = require('express');
const { userController } = require('../controllers');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/inputsValidation');
const tokenAuthorization = require('../middlewares/tokenAuthorization');

const router = express.Router();

router.post(
  '/',
  validateDisplayName,
  validateEmail,
  validatePassword,
  userController.createUser,
);

router.get('/', tokenAuthorization, userController.getAllUsers);

router.get('/:id', tokenAuthorization, userController.getUserById);

module.exports = router;
