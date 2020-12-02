const express = require('express');

const UsersController = require('../controllers/UsersController');
const validations = require('../middlewares/validations');
const { validateCreateUser, checkIfEmailExist } = validations;
const router = express.Router();

router.post('/', validateCreateUser, checkIfEmailExist, UsersController.createUsersController);

module.exports = router;
