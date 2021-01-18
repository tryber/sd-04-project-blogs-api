const loginController = require('express').Router();
const { createToken } = require('../auth');
const {
  validateEmail,
  validatePassword,
  validateCredentials,
} = require('../middlewares/loginValidations');

loginController.post('/', validateEmail, validatePassword, validateCredentials, (req, res) => {
  const token = createToken(req.user);

  return res.status(200).json({ token });
});

module.exports = loginController;
