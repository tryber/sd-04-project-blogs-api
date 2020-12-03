const express = require('express');

const UsersController = require('../controllers/UsersController');
const { validateCreateUser, checkIfEmailExist } = require('../middlewares/validationUsers');
const validateToken = require('../auth/validateToken');

const router = express.Router();

router.post('/', validateCreateUser, checkIfEmailExist, UsersController.createUsersController);

router.get('/', validateToken, UsersController.getAllUsersController);

router.get('/:id', validateToken, UsersController.getByIdController);

router.delete('/me', validateToken, UsersController.deleteUserController);

module.exports = router;
