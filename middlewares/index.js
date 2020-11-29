const { authJWT } = require('./authJWT');
const validateLogin = require('./validateLogin');
const validateUser = require('./validateUsers');
const validatePost = require('./validatePosts');

module.exports = {
  authJWT,
  validateLogin,
  validateUser,
  validatePost,
};
