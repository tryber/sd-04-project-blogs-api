const { authJWT } = require('./auth');
const validateUser = require('./validateCreateUser');

module.exports = {
  authJWT,
  validateUser,
};
