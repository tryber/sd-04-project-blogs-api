const express = require('express');
const usersValidation = require('../middlewares/usersValidation');
const { validateToken } = require('../services/auth');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post(
  '/',
  usersValidation.checkName,
  usersValidation.checkEmail,
  usersValidation.checkPassword,
  usersValidation.checkUserExists,
  usersController.post,
);

router.get('/', validateToken, usersController.get);

router.get('/:id', validateToken, usersController.getById);

router.delete('/me', validateToken, usersController.delete);
