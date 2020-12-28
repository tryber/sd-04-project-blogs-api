const validateUser = require('./UserValidator');
const validateLogin = require('./LoginVlidator');
const validatePost = require('./PostValidator');
const validateJWT = require('./JWTValidator');

module.exports = {
  validateUser,
  validateLogin,
  validatePost,
  validateJWT,
};
