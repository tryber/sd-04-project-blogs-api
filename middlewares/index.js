const { authJWT } = require('./auth');
const validateBlog = require('./validateBlog');
const validateUser = require('./validateCreateUser');

module.exports = {
  authJWT,
  validateUser,
  validateBlog,
};
