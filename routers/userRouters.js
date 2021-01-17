const express = require('express');

const {
  createUsersController,
  getAllUsersController,
  getByIdController,
  deleteUserController,
// eslint-disable-next-line import/no-unresolved
} = require('../controllers/UsersController');
const { validateCreateUser, checkIfEmailExist } = require('../middlewares/validationUsers');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validateCreateUser, checkIfEmailExist, createUsersController);

router.get('/', validateToken, getAllUsersController);

router.get('/:id', validateToken, getByIdController);

router.delete('/me', validateToken, deleteUserController);

module.exports = router;
