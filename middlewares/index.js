const { authJWT } = require('./authJWT');
const validateLogin = require('./validateLogin');
const validateCreateUser = require('./validateCreateUsers');

module.exports = {
  authJWT,
  validateLogin,
  validateCreateUser,
};
