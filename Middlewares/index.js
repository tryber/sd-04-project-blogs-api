const validateUser = require('./UserValidator');
const validateLogin = require('./LoginVlidator');
const validateJWT = require('./JWTValidator');

module.exports = {
  validateUser,
  validateLogin,
  validateJWT,
};
