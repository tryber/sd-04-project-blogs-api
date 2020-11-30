const { loginValidation } = require('../utils/validations');

const validateLogin = (req, _res, next) => {
  loginValidation(req.body);
  next();
};

module.exports = { validateLogin };
