const express = require('express');

const router = express.Router();

const controllers = require('../controllers');

const middleware = require('../middleware');

router.post(
  '/',
  middleware.validations.loginValidation,
  controllers.authenticate.userLogin,
);
router.post('/forgotPassword', controllers.authenticate.forgotPassword);
router.post('/resetPassword', controllers.authenticate.resetPassword);

module.exports = router;
