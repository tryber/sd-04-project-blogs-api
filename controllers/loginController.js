const express = require('express');
const { userLoginValidation, loginEmailValidation, loginPassValidation } = require('../services/loginServices');

const router = express.Router();

router.post('/', loginEmailValidation, loginPassValidation, userLoginValidation);

module.exports = router;
