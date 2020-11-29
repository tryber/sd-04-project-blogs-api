const { authJWT } = require('./authJWT');
const validateLogin = require('./validateLogin');
const validateCreateUser = require('./validateCreateUsers');
const validateCreatePost = require('./validateCreatePosts');

module.exports = {
  authJWT,
  validateLogin,
  validateCreateUser,
  validateCreatePost,
};
