const express = require('express');
const { userLoginValidation } = require('../services/loginServices');
const { passValidation, emailValidation } = require('../services/userServices');

const router = express.Router();

router.post('/', passValidation, emailValidation, userLoginValidation);

module.exports = router;
