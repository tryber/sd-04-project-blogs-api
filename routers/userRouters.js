const express = require('express');

const UsersController = require('../controllers/UsersController');
const { validateCreateUser, checkIfEmailExist } = require('../middlewares/validations');

const router = express.Router();

router.post('/', validateCreateUser, checkIfEmailExist, UsersController.createUsersController);

module.exports = router;
